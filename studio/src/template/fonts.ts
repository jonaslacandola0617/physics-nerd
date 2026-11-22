import {loadFont as loadAnton} from '@remotion/google-fonts/Anton';
import {loadFont as loadMontserrat} from '@remotion/google-fonts/Montserrat';

export const {fontFamily: TITLE_FONT} = loadAnton('normal', {weights: ['400'], subsets: ['latin']});
export const {fontFamily: BODY_FONT} = loadMontserrat('normal', {weights: ['800', '900'], subsets: ['latin']});

export const COLORS = {
  accent: '#FFD60A', // active caption word / highlights
  danger: '#FF3B30',
  good: '#34C759',
  ink: '#0B0D12',
  white: '#FFFFFF',
};

// 1080x1920 layout
export const LAYOUT = {
  titleTop: 190,
  boxTop: 430,
  boxHeight: 1060,
};
