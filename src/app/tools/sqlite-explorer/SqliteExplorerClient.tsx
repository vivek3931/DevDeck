'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './SqliteExplorer.module.css';
import { Button } from '@/components/ui/Button';
import { UploadCloud, Play, Database, File, AlertCircle, X } from 'lucide-react';
import { toast } from 'sonner';
// Note: We use type imports and will load the actual sql.js dynamically 
// so it doesn't break SSR (WebAssembly can only run in the browser).
import type { Database as SqlJsDatabase } from 'sql.js';

type QueryResult = {
  columns: string[];
  values: any[][];
};

export default function SqliteExplorerClient() {
  const [db, setDb] = useState<SqlJsDatabase | null>(null);
  const [tables, setTables] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize sql.js on mount
  useEffect(() => {
    const initSqlJs = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const initSqlJsLib = (await import('sql.js')).default;
        const SQL = await initSqlJsLib({
          // Fetch the wasm file directly from the public directory
          locateFile: () => `/sql-wasm.wasm`
        });
        
        // Expose SQL object globally just in case (optional)
        // @ts-ignore
        window.SQL = SQL;
        setIsInitializing(false);
      } catch (err) {
        console.error('Failed to initialize sql.js', err);
        setError('Failed to initialize SQLite engine. Make sure sql-wasm.wasm is in the public directory.');
        setIsInitializing(false);
      }
    };
    initSqlJs();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError(null);
    setResults(null);
    setQuery('');

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const uInt8Array = new Uint8Array(reader.result as ArrayBuffer);
        // @ts-ignore
        if (window.SQL) {
          // @ts-ignore
          const newDb = new window.SQL.Database(uInt8Array);
          setDb(newDb);
          
          // Fetch tables
          try {
            const res = newDb.exec("SELECT name FROM sqlite_master WHERE type='table';");
            if (res.length > 0) {
              setTables(res[0].values.map((row: any) => row[0] as string));
            } else {
              setTables([]);
            }
          } catch (e) {
            console.error(e);
          }
          
          toast.success('Database loaded successfully');
        } else {
          setError('SQLite engine not ready yet.');
        }
      } catch (err: any) {
        console.error(err);
        setError(`Failed to open database: ${err.message}`);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const executeQuery = () => {
    if (!db) {
      setError('No database loaded');
      return;
    }
    
    if (!query.trim()) {
      return;
    }

    setError(null);
    try {
      const res = db.exec(query);
      if (res.length > 0) {
        setResults({
          columns: res[0].columns,
          values: res[0].values
        });
      } else {
        setResults({ columns: [], values: [] });
        toast('Query executed successfully (0 rows returned)');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setResults(null);
    }
  };

  const handleTableClick = (tableName: string) => {
    const defaultQuery = `SELECT * FROM "${tableName}" LIMIT 100;`;
    setQuery(defaultQuery);
    
    if (db) {
      setError(null);
      try {
        const res = db.exec(defaultQuery);
        if (res.length > 0) {
          setResults({
            columns: res[0].columns,
            values: res[0].values
          });
        } else {
          setResults({ columns: [], values: [] });
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message);
        setResults(null);
      }
    }
  };

  const closeDatabase = () => {
    if (db) {
      db.close();
      setDb(null);
    }
    setTables([]);
    setResults(null);
    setQuery('');
    setFileName('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={styles.container} style={{ marginTop: 'var(--spacing-xl)' }}>
      <div className={styles.pane}>
        {!db ? (
          <div 
            className={styles.uploadArea} 
            onClick={() => fileInputRef.current?.click()}
          >
            <Database size={48} className={styles.uploadIcon} />
            <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>
              {isInitializing ? 'Loading Engine...' : 'Select a SQLite Database'}
            </h3>
            <p className="body-sm" style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)' }}>
              Supports .sqlite, .sqlite3, .db files. Loaded entirely in memory.
            </p>
            <Button disabled={isInitializing} variant="inverse">
              <UploadCloud size={16} /> Browse Files
            </Button>
            <input 
              type="file" 
              accept=".sqlite,.sqlite3,.db" 
              className={styles.hiddenInput} 
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
          </div>
        ) : (
          <div className={styles.explorerLayout}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="body-sm" style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <File size={16} /> {fileName}
                </h3>
                <button 
                  onClick={closeDatabase}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                  title="Close Database"
                >
                  <X size={16} />
                </button>
              </div>
              <hr style={{ borderColor: 'var(--color-hairline)', margin: 'var(--spacing-sm) 0' }} />
              
              <h4 className="caption" style={{ marginBottom: 'var(--spacing-xs)' }}>Tables</h4>
              <div className={styles.tableList}>
                {tables.length === 0 ? (
                  <div className="body-sm" style={{ color: 'var(--color-text-muted)' }}>No tables found</div>
                ) : (
                  tables.map((table) => (
                    <div 
                      key={table} 
                      className={styles.tableName}
                      onClick={() => handleTableClick(table)}
                    >
                      {table}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Main Editor & Results */}
            <div className={styles.mainArea}>
              <div className={styles.queryBox}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="caption">SQL Query</span>
                  <Button size="sm" variant="inverse" onClick={executeQuery} disabled={!query.trim()}>
                    <Play size={14} /> Run Query
                  </Button>
                </div>
                <textarea 
                  className={styles.textarea} 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="SELECT * FROM table_name;"
                  spellCheck={false}
                />
              </div>

              {error && (
                <div className={styles.errorBox}>
                  <AlertCircle size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                  {error}
                </div>
              )}

              {results && (
                <div className={styles.resultsArea}>
                  {results.columns.length === 0 ? (
                    <div style={{ padding: 'var(--spacing-lg)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                      No results
                    </div>
                  ) : (
                    <table className={styles.resultsTable}>
                      <thead>
                        <tr>
                          {results.columns.map((col, i) => (
                            <th key={i}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {results.values.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((val, colIndex) => (
                              <td key={colIndex}>
                                {val !== null ? String(val) : <span style={{ color: 'var(--color-text-muted)' }}>NULL</span>}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
