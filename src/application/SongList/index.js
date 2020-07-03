import React, { useState, useEffect } from 'react';
import { SongList, SongItem } from './style';
import { getName } from '../../api/utils';
import { ONE_PAGE_COUNT } from 'react-redux';
import {
	changePlayList,
	changeCurrentIndex,
	changeSequecePlayList,
} from './../../application/Player/store/actionCreators';
