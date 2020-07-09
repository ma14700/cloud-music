import React, { useState, useEffect } from 'react';
import { SongList, SongItem } from './style';
import { getName } from '../../api/utils';
import { ONE_PAGE_COUNT } from '../../api/config';
import { connect } from 'react-redux';
// import {
// 	changePlayList,
// 	changeCurrentIndex,
// 	changeSequecePlayList,
// } from './../../application/Player/store/actionCreators';

const SongsList = React.forwardRef((props, refs) => {
	const [startIndex, setStartIndex] = useState(0);

	const { songs, collectCount, showCollect, loading = false, usePageSplit } = props;

	const { musicAnimation } = props;

	const { changePlayListDispatch, changeCurrentIndexDispatch, changeSequecePlayListDispatch } = props;

	const totalCount = songs.length;

	useEffect(() => {
		if (!loading) return;
		if (startIndex + 1 + ONE_PAGE_COUNT >= totalCount) return;
		setStartIndex(startIndex + ONE_PAGE_COUNT);
	}, [loading, startIndex, totalCount]);

	const selectItem = (e, index) => {};

	let songList = (list) => {
		console.log(list, 213);
		let res = [];
		let end = usePageSplit ? startIndex + ONE_PAGE_COUNT : list.length;
		for (let i = 0; i < end; i++) {
			if (i >= list.length) break;
			let item = list[i];
			res.push(
				<li key={item.id} onClick={(e) => selectItem(e, i)}>
					<span className="index">{i + 1}</span>
					<div className="info">
						<span>{item.name}</span>
						<span>
							{item.ar ? getName(item.ar) : getName(item.artists)} -{' '}
							{item.al ? item.al.name : item.album.name}
						</span>
					</div>
				</li>
			);
		}
		return res;
	};

	// const collect = (count) => {
	// 	return (
	// 		<div className="add_list">
	// 			<i className="iconfont">&#xe62d;</i>
	// 			<span>收藏({Math.floor(count / 1000) / 10}万)</span>
	// 		</div>
	// 	);
	// };

	return (
		<SongList>
			<div className="first_line">
				<div className="play_all" onClick={(e) => selectItem(e, 0)}>
					<i className="iconfont">&#xe6e3;</i>
					<span>
						播放全部 <span className="sum">(共{totalCount}首)</span>
					</span>
				</div>
				{showCollect ? collect(collectCount) : null}
			</div>
			<SongItem>{songList(songs)}</SongItem>
		</SongList>
	);
});
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default SongsList;
