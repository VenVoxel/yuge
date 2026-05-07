/*
  湯気生成スクリプト（最小限のJS）
  - data-count: 湯気本数
  - data-opacity: 濃さ（0.1〜0.8推奨）
  - data-speed: 速度倍率（小さいほどゆっくり）
  - data-spread: 横方向の広がり(px)
*/
(() => {
  const layers = document.querySelectorAll('[data-steam]');

  layers.forEach((layer) => {
    const count = Number(layer.dataset.count || 10);
    const opacity = Number(layer.dataset.opacity || 0.35);
    const speed = Number(layer.dataset.speed || 1);
    const spread = Number(layer.dataset.spread || 70);

    // エリアごとに濃度を変えやすいようCSS変数へ反映
    layer.style.setProperty('--steam-base-opacity', String(opacity));

    for (let i = 0; i < count; i += 1) {
      const puff = document.createElement('span');
      puff.className = 'steam-puff';

      // 左右の発生位置（中心からのズレ）
      const x = ((i / Math.max(count - 1, 1)) * 2 - 1) * spread;
      puff.style.left = `calc(50% + ${x.toFixed(1)}px)`;

      // 1本ごとにわずかに個性をつけて、機械的な動きを回避
      const delay = Math.random() * 6.5;
      const speedMul = speed * (0.88 + Math.random() * 0.34);
      const driftA = -14 + Math.random() * 28;
      const driftB = -18 + Math.random() * 36;
      const puffOpacity = 0.7 + Math.random() * 0.45;

      puff.style.setProperty('--delay', `${delay.toFixed(2)}s`);
      puff.style.setProperty('--speed-mul', speedMul.toFixed(3));
      puff.style.setProperty('--drift-a', `${driftA.toFixed(1)}px`);
      puff.style.setProperty('--drift-b', `${driftB.toFixed(1)}px`);
      puff.style.setProperty('--puff-opacity', puffOpacity.toFixed(3));

      layer.appendChild(puff);
    }
  });
})();
