export interface ConstantesCertificado {
  INSTITUCION: string;
  NIT: string;
  SNIES: string;
  DIRECCION: string;
  FIRMA_NOMBRE: string;
  FIRMA_CARGO: string;
  LOGO: string;
  COLOR_PRIMARY: string;
  COLOR_ACCENT: string;
  COLOR_TEXT: string;
  COLOR_MUTED: string;
  COLOR_LIGHT: string;
  COLOR_BORDER: string;
}

export const CONSTANTES_CERTIFICADO: ConstantesCertificado = {
  INSTITUCION: 'CORPORACIÓN ESCUELA TECNOLÓGICA DEL ORIENTE',
  NIT: '804.006.527-3',
  SNIES: '804.006.527-3',
  DIRECCION: 'Bucaramanga, Santander',
  FIRMA_NOMBRE: 'MAGDA CAROLINA REYES RINCÓN',
  FIRMA_CARGO: 'Vicerrectora Académica',
  LOGO: 'https://tecnologicadeloriente.edu.co/wp-content/uploads/2024/09/cropped-LOGO-ILLUSTRATOR-01-295x59.avif',
  COLOR_PRIMARY: '#F57C00',
  COLOR_ACCENT: '#E65100',
  COLOR_TEXT: '#000000',
  COLOR_MUTED: '#555555',
  COLOR_LIGHT: '#f5f5f5',
  COLOR_BORDER: '#cccccc'
};

export const CONSTANTES_CERTIFICADO_PREVIEW: ConstantesCertificado = {
  ...CONSTANTES_CERTIFICADO,
  COLOR_TEXT: '#1a1a1a',
  COLOR_MUTED: '#666666'
};