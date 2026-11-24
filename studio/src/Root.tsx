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
import {FPS, Short, episodeFrames} from './template/Short';
import {Episode} from './template/types';

const episodes: Episode[] = [ep01, ep02, ep03, ep04, ep05, ep06, ep07, ep08, ep09, ep10, ep11, ep12, ep13, ep14, ep15, ep16];

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
