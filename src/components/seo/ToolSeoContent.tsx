import React from 'react';
import styles from './ToolSeoContent.module.css';

interface FaqItem {
  question: string;
  answer: string;
}

interface HowToStep {
  name: string;
  text: string;
}

interface ToolSeoContentProps {
  whatIs: {
    title: string;
    content: string;
  };
  howTo: {
    title: string;
    steps: HowToStep[];
  };
  faq: FaqItem[];
  whyDevDeck?: string;
}

export function ToolSeoContent({ whatIs, howTo, faq, whyDevDeck }: ToolSeoContentProps) {
  return (
    <section className={styles.seoSection}>
      {/* What Is Section */}
      <div className={styles.block}>
        <h2 className={styles.heading}>{whatIs.title}</h2>
        <p className={styles.text}>{whatIs.content}</p>
      </div>

      {/* How To Section */}
      <div className={styles.block}>
        <h2 className={styles.heading}>{howTo.title}</h2>
        <ol className={styles.steps}>
          {howTo.steps.map((step, i) => (
            <li key={i} className={styles.step}>
              <span className={styles.stepNumber}>{i + 1}</span>
              <div>
                <strong className={styles.stepName}>{step.name}</strong>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* FAQ Section */}
      <div className={styles.block}>
        <h2 className={styles.heading}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {faq.map((item, i) => (
            <details key={i} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{item.question}</summary>
              <p className={styles.faqAnswer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Why DevDeck */}
      {whyDevDeck && (
        <div className={styles.block}>
          <h2 className={styles.heading}>Why Use DevDeck?</h2>
          <p className={styles.text}>{whyDevDeck}</p>
        </div>
      )}
    </section>
  );
}
