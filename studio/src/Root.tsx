import React from 'react';
import {Composition, Still} from 'remotion';
import {Avatar, Banner} from './brand/Brand';
import {ep01} from './episodes/ep01';
import {ep02} from './episodes/ep02';
import {ep03} from './episodes/ep03';
import {ep04} from './episodes/ep04';
import {ep05} from './episodes/ep05';
import {ep06} from './episodes/ep06';
import {ep07} from './episodes/ep07';
import {ep08} from './episodes/ep08';
import {ep09} from './episodes/ep09';
import {ep10} from './episodes/ep10';
import {ep11} from './episodes/ep11';
import {ep12} from './episodes/ep12';
import {ep13} from './episodes/ep13';
import {ep14} from './episodes/ep14';
import {ep15} from './episodes/ep15';
import {ep16} from './episodes/ep16';
import {ep17} from './episodes/ep17';
import {ep18} from './episodes/ep18';
import {ep19} from './episodes/ep19';
import {ep20} from './episodes/ep20';
import {ep21} from './episodes/ep21';
import {ep22} from './episodes/ep22';
import {ep23} from './episodes/ep23';
import {ep24} from './episodes/ep24';
import {ep25} from './episodes/ep25';
import {ep26} from './episodes/ep26';
import {ep27} from './episodes/ep27';
import {ep28} from './episodes/ep28';
import {ep29} from './episodes/ep29';
import {ep30} from './episodes/ep30';
import {ep31} from './episodes/ep31';
import {ep32} from './episodes/ep32';
import {ep33} from './episodes/ep33';
import {ep34} from './episodes/ep34';
import {ep35} from './episodes/ep35';
import {FPS, Short, episodeFrames} from './template/Short';
import {Episode} from './template/types';

const episodes: Episode[] = [ep01, ep02, ep03, ep04, ep05, ep06, ep07, ep08, ep09, ep10, ep11, ep12, ep13, ep14, ep15, ep16, ep17, ep18, ep19, ep20, ep21, ep22, ep23, ep24, ep25, ep26, ep27, ep28, ep29, ep30, ep31, ep32, ep33, ep34, ep35];

export const Root: React.FC = () => (
  <>
    {episodes.map((ep) => (
      <Composition
        key={ep.id}
        id={ep.id}
        component={Short}
        defaultProps={{ep}}
        durationInFrames={episodeFrames(ep)}
        fps={FPS}
        width={1080}
        height={1920}
      />
    ))}
    <Still id="avatar" component={Avatar} width={800} height={800} />
    <Still id="banner" component={Banner} width={2560} height={1440} />
  </>
);
