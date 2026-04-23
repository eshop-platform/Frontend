const COLOR_MAP = {
  'phantom black': '#1a1a1a', 'ghost white': '#f5f5f5', 'midnight blue': '#191970',
  'tan': '#d2b48c', 'black': '#1a1a1a', 'espresso': '#4b2c20',
  'slate': '#708090', 'forest': '#228b22', 'matte black': '#1a1a1a',
  'silver mist': '#c0c0c0', 'sand': '#c2b280', 'camel': '#c19a6b',
  'charcoal': '#36454f', 'navy': '#001f5b', 'ice gray': '#d3d3d3',
  'graphite': '#474747', 'olive': '#808000', 'ivory': '#fffff0',
  'stone': '#928e85', 'coal': '#2c2c2c', 'terracotta': '#e2725b',
  'oatmeal': '#e8dcc8', 'sage': '#87ae73', 'khaki': '#c3b091',
  'fog': '#d5d8dc', 'white': '#ffffff', 'clay': '#b66a50',
  'ash': '#b2beb5', 'cobalt': '#0047ab', 'moon': '#e8e8e8',
  'glacier': '#b0d8e8', 'onyx': '#353839', 'moss': '#8a9a5b',
  'brass': '#b5a642', 'silver': '#c0c0c0', 'heather gray': '#9e9e9e',
  'rust': '#b7410e', 'sky': '#87ceeb', 'clear': '#e8f4f8',
  'tortoise': '#8b5e3c', 'clear frame': '#e8f4f8',
};

export const getColor = (name) => COLOR_MAP[name.toLowerCase()] ?? '#cccccc';
