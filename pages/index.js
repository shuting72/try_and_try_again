'use client';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

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

export default function Control() {
  const [data, setData] = useState({});

  const handleChange = (stage, key, value) => {
    setData(prev => {
      const updated = { ...prev };
      updated[stage] = updated[stage] || {};
      updated[stage][key] = value;

      // 更新 Firestore
      setDoc(doc(db, 'scores', stage), updated[stage]);

      return updated;
    });
  };

  return (
    <div style={{
      background: '#111',
      color: '#fff',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h2 style={{ padding: '10px' }}>控場介面</h2>

      <div style={{
        flex: '1 1 auto',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '10px',
          padding: '10px'
        }}>
          {stages.map(s => (
            <div key={s.name} style={{ background: '#222', padding: '10px', borderRadius: '6px' }}>
              <strong>{s.icon} {s.name}</strong>
              <div style={{ marginTop: '6px' }}>
                <input
                  placeholder="成績"
                  value={data[s.name]?.score || ''}
                  onChange={e => handleChange(s.name, 'score', e.target.value)}
                  style={{ width: '80px', marginRight: '5px', color: '#000' }}
                />
                <select
                  value={data[s.name]?.team || ''}
                  onChange={e => handleChange(s.name, 'team', e.target.value)}
                  style={{ color: '#000' }}
                >
                  <option value="">選擇小隊</option>
                  <option value="1">第一小隊</option>
                  <option value="2">第二小隊</option>
                  <option value="3">第三小隊</option>
                  <option value="4">第四小隊</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        padding: '10px',
        background: '#111',
        borderTop: '1px solid #333'
      }}>
        <button
          onClick={async () => {
            if (confirm('確定要清除所有資料嗎？')) {
              for (let s of stages) {
                await setDoc(doc(db, 'scores', s.name), {});
              }
              location.reload();
            }
          }}
          style={{ padding: '8px 16px', background: 'red', color: '#fff', border: 'none' }}
        >
          初始化所有成績
        </button>
      </div>
    </div>
  );
}
