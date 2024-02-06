const features = {
    size: ['6mm', '8mm', 'combine'],
    type: ['front', 'corner', 'half-bath', 'full-bath', 'door', 'truncated'],
    subType: ['2doors', 'onedoor', 'permanent', 'harmonica', 'door&harmonica', 'moving'],
    color: ['nickel', 'black', 'white', 'gold', 'graphite'],
    glass: ['transparent', 'papita', 'acid', 'etch'],
  };

const translationMap = {
  'edit': 'ערוך' , 
  'delete' : 'מחק' ,
  'size': 'גודל',
  'type': 'קטגוריה',
  'subType': 'סוג',
  'color': 'צבע',
  'glass': 'זכוכית',
  '6mm': '6 מ"מ',
  '8mm': '8 מ"מ',
  'combine': 'משולב',
  'front': 'חזיתי',
  'corner': 'פינתי',
  'half-bath': 'אמבטיון חלקי',
  'full-bath': 'אמבטיון מלא',
  'door': 'דלת',
  'truncated': 'קטום',
  '2doors': '2 דלתות',
  'onedoor': 'דלת אחת',
  'permanent': 'קבוע',
  'harmonica': 'הרמוניקה',
  'door&harmonica': 'דלת/קבוע והרמוניקה',
  'moving': 'הזזה',
  'nickel': 'ניקל',
  'black': 'שחור',
  'white': 'לבן',
  'gold': 'זהב',
  'graphite': 'גרפיט',
  'transparent': 'שקוף',
  'papita': 'פפיטה',
  'acid': 'אסיד',
  'etch': 'צריבה',
  'illustration': 'הדמיה'
};

  
  const transformations =
    "co_rgb:FFFFFF8F,l_text:helvetica_120_bold_normal_left:יואל מעודי מקלחונים/fl_layer_apply,g_center";
  
  function applyTransformations(url) {
    return url.replace('/upload/', `/upload/${transformations}/`);
  }
  
  module.exports = { features,translationMap, applyTransformations };
  