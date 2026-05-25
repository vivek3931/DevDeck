import React from 'react';
import styles from './HeroOrb.module.css';

export function HeroOrb() {
  return (
    <div className={styles.container}>
      <svg
        className={styles.svg}
        viewBox="0 0 1440 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
      >
        <mask
          id="heroOrbMask"
          maskUnits="userSpaceOnUse"
          x="0"
          y="-100"
          width="1440"
          height="800"
          style={{ maskType: 'alpha' }}
        >
          <rect y="-100" width="1440" height="800" fill="#D9D9D9" />
        </mask>
        <g mask="url(#heroOrbMask)">
          <g opacity="0.6">
            <circle cx="720" cy="700" r="1000" fill="#00FFF0" />
            <circle cx="720" cy="700" r="1000" fill="url(#hoG0)" />
            <circle cx="720" cy="700" r="1000" fill="url(#hoG1)" />
          </g>
          <g opacity="0.6">
            <circle cx="720" cy="700" r="900" fill="#00FFF0" />
            <circle cx="720" cy="700" r="900" fill="url(#hoG2)" />
            <circle cx="720" cy="700" r="900" fill="url(#hoG3)" />
          </g>
          <g opacity="0.6">
            <circle cx="720" cy="700" r="800" fill="#00FFF0" />
            <circle cx="720" cy="700" r="800" fill="url(#hoG4)" />
            <circle cx="720" cy="700" r="800" fill="url(#hoG5)" />
          </g>
          <g opacity="0.7">
            <circle cx="720" cy="700" r="700" fill="#00FFF0" />
            <circle cx="720" cy="700" r="700" fill="url(#hoG6)" />
            <circle cx="720" cy="700" r="700" fill="url(#hoG7)" />
          </g>
          <g opacity="0.8">
            <circle cx="720" cy="700" r="600" fill="#00FFF0" />
            <circle cx="720" cy="700" r="600" fill="url(#hoG8)" />
            <circle cx="720" cy="700" r="600" fill="url(#hoG9)" />
          </g>
          <g>
            <circle cx="720" cy="700" r="480" fill="#00FFF0" />
            <circle cx="720" cy="700" r="480" fill="url(#hoG10)" />
            <circle cx="720" cy="700" r="480" fill="url(#hoG11)" />
          </g>
          <g opacity="0.9">
            <circle cx="720" cy="700" r="500" fill="#00FFF0" />
            <circle cx="720" cy="700" r="500" fill="url(#hoG12)" />
            <circle cx="720" cy="700" r="500" fill="url(#hoG13)" />
          </g>
          <g>
            <circle cx="720" cy="700" r="400" fill="#00FFF0" />
            <circle cx="720" cy="700" r="400" fill="url(#hoG14)" />
            <circle cx="720" cy="700" r="400" fill="url(#hoG15)" />
          </g>
          <g>
            <circle cx="720" cy="700" r="300" fill="#00FFF0" />
            <circle cx="720" cy="700" r="300" fill="url(#hoG16)" />
            <circle cx="720" cy="700" r="300" fill="url(#hoG17)" />
          </g>
        </g>
        <defs>
          <linearGradient id="hoG0" x1="1377.68" y1="253.275" x2="1528.71" y2="87.727" gradientUnits="userSpaceOnUse">
            <stop stopColor="#55F5A3" stopOpacity="0" />
            <stop offset="1" stopColor="#55F5A3" />
          </linearGradient>
          <linearGradient id="hoG1" x1="539.502" y1="558.921" x2="169.55" y2="-260.423" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E1FF25" stopOpacity="0" />
            <stop offset="0.929" stopColor="#E1FF25" />
          </linearGradient>
          <linearGradient id="hoG2" x1="1311.91" y1="297.948" x2="1447.84" y2="148.954" gradientUnits="userSpaceOnUse">
            <stop stopColor="#55F5A3" stopOpacity="0" />
            <stop offset="1" stopColor="#55F5A3" />
          </linearGradient>
          <linearGradient id="hoG3" x1="557.552" y1="573.029" x2="224.595" y2="-164.381" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E1FF25" stopOpacity="0" />
            <stop offset="0.929" stopColor="#E1FF25" />
          </linearGradient>
          <linearGradient id="hoG4" x1="1246.15" y1="342.62" x2="1366.97" y2="210.182" gradientUnits="userSpaceOnUse">
            <stop stopColor="#55F5A3" stopOpacity="0" />
            <stop offset="1" stopColor="#55F5A3" />
          </linearGradient>
          <linearGradient id="hoG5" x1="575.602" y1="587.137" x2="279.64" y2="-68.339" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E1FF25" stopOpacity="0" />
            <stop offset="0.929" stopColor="#E1FF25" />
          </linearGradient>
          <linearGradient id="hoG6" x1="1180.38" y1="387.293" x2="1286.1" y2="271.409" gradientUnits="userSpaceOnUse">
            <stop stopColor="#55F5A3" stopOpacity="0" />
            <stop offset="1" stopColor="#55F5A3" />
          </linearGradient>
          <linearGradient id="hoG7" x1="593.652" y1="601.245" x2="334.685" y2="27.704" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E1FF25" stopOpacity="0" />
            <stop offset="0.929" stopColor="#E1FF25" />
          </linearGradient>
          <linearGradient id="hoG8" x1="1114.61" y1="431.965" x2="1205.23" y2="332.636" gradientUnits="userSpaceOnUse">
            <stop stopColor="#55F5A3" stopOpacity="0" />
            <stop offset="1" stopColor="#55F5A3" />
          </linearGradient>
          <linearGradient id="hoG9" x1="611.701" y1="615.353" x2="389.73" y2="123.746" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E1FF25" stopOpacity="0" />
            <stop offset="0.929" stopColor="#E1FF25" />
          </linearGradient>
          <linearGradient id="hoG10" x1="1046.24" y1="463.363" x2="1096.25" y2="397.492" gradientUnits="userSpaceOnUse">
            <stop stopColor="#55F5A3" stopOpacity="0" />
            <stop offset="1" stopColor="#55F5A3" />
          </linearGradient>
          <linearGradient id="hoG11" x1="633.28" y1="631.984" x2="465.171" y2="274.078" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E1FF25" stopOpacity="0" />
            <stop offset="1" stopColor="#E1FF25" />
          </linearGradient>
          <linearGradient id="hoG12" x1="1048.84" y1="476.638" x2="1124.35" y2="393.864" gradientUnits="userSpaceOnUse">
            <stop stopColor="#55F5A3" stopOpacity="0" />
            <stop offset="1" stopColor="#55F5A3" />
          </linearGradient>
          <linearGradient id="hoG13" x1="629.751" y1="629.461" x2="444.775" y2="219.788" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E1FF25" stopOpacity="0" />
            <stop offset="0.929" stopColor="#E1FF25" />
          </linearGradient>
          <linearGradient id="hoG14" x1="927.987" y1="498.316" x2="1029.64" y2="421.06" gradientUnits="userSpaceOnUse">
            <stop stopColor="#55F5A3" stopOpacity="0" />
            <stop offset="1" stopColor="#55F5A3" />
          </linearGradient>
          <linearGradient id="hoG15" x1="647.662" y1="643.43" x2="528.794" y2="329.147" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E1FF25" stopOpacity="0" />
            <stop offset="1" stopColor="#E1FF25" />
          </linearGradient>
          <linearGradient id="hoG16" x1="802.781" y1="684.44" x2="946.214" y2="481.88" gradientUnits="userSpaceOnUse">
            <stop stopColor="#55F5A3" stopOpacity="0" />
            <stop offset="1" stopColor="#55F5A3" />
          </linearGradient>
          <linearGradient id="hoG17" x1="665.851" y1="657.676" x2="566.521" y2="427.843" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E1FF25" stopOpacity="0" />
            <stop offset="1" stopColor="#E1FF25" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
