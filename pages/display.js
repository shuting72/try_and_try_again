'use client';
import { useState, useEffect } from 'react';
import styles from '../styles/display.module.css';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const stages = [
  { name: '按筆操課', icon: '🖊️' },
  { name: '誰是金魚腦', icon: '🐠' },
  { name: '各瓶本事', icon: '🍶' },
  { name: '誰沒水準', icon: '💧' },
  { name: '大亂豆', icon: '🌱' },
  { name: '虔誠拜三拜', icon: '🕯️' },
  { name: '背多分', icon: '🧠' },
  { name: '移杯杯起', icon: '🍵' },
  { name: '斤斤計豆', icon: '🫘' },
  { name: '拖鞋王', icon: '🩴' },
  { name: '你說我猜', icon: '💬' },
  { name: '想跟你一杯子', icon: '🕸️' },
  { name: '一線牽掛', icon: '👕' },
  { name: '不能落氣', icon: '🎈' },
  { name: '傳承永續', icon: '🪢' },
  { name: '毫秒之差', icon: '⏱️' }
];

export default function Display() {
  const [data, setData] = useState({});

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'scores'), (snapshot) => {
      const newData = {};
      snapshot.forEach(doc => {
        newData[doc.id] = doc.data();
      });
      setData(newData);
    });
    return () => unsub();
  }, []);

  return (
    <div
      className={styles.grid}
      style={{
        minHeight: '100vh',
        height: '100vh',
        boxSizing: 'border-box'
      }}
    >
      {stages.map(s => {
        const d = data[s.name] || {};
        return (
          <div
            key={s.name}
            className={styles.card}
            style={{
              background: d.team ? getColor(d.team) : '#000'
            }}
          >
            <div className={styles.stage} style={{ fontSize: '32px' }}>{s.icon} {s.name}</div>
            <div className={styles.score} style={{ fontSize: '28px' }}>成績：{d.score || '--'}</div>
            <div className={styles.team} style={{ fontSize: '28px' }}>第{d.team || '--'}小隊</div>
          </div>
        );
      })}
    </div>
  );
}

function getColor(team) {
  const colors = {
    1: 'red',
    2: '#CCCC00',  // 深黃
    3: 'green',
    4: 'blue'
  };
  return colors[team] || '#000';
}
