import React from 'react';
import {Composition} from 'remotion';
import {ep01} from './episodes/ep01';
import {ep02} from './episodes/ep02';
import {ep03} from './episodes/ep03';
import {ep04} from './episodes/ep04';
import {ep05} from './episodes/ep05';
import {FPS, Short, episodeFrames} from './template/Short';
import {Episode} from './template/types';

const episodes: Episode[] = [ep01, ep02, ep03, ep04, ep05];

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
  </>
);
