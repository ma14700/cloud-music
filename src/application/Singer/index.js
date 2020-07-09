import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container } from './style';
import Header from '../../baseUI/header/index';
import { ImgWrapper, CollectButton, SongListWrapper, BgLayer } from './style';
import Scroll from '../../baseUI/scroll/index';
import { HEADER_HEIGHT } from '../../api/config';
import { getSingerInfo } from './store/actionCreators';
import { connect } from 'react-redux';
import Loading from './../../baseUI/loading/index';
import { EnterLoading } from '../Singers/style';
import { changeEnterLoading } from './store/actionCreators';
import { constants } from '../Recommend/store';
import SongsList from '../SongList';

function Singer(props) {
	const initialHeight = useRef(0);
	const [showStatus, setShowStatus] = useState(true);

	const OFFSET = 5;

	const { artist: immutableArtist, songs: immutableSongs, loading, songsCount } = props;

	const { getSingerDataDispatch } = props;

	const artist = immutableArtist.toJS();
	const songs = immutableSongs.toJS();
	console.log(immutableArtist);

	const collectButton = useRef();
	const imageWrapper = useRef();
	const songScrollWrapper = useRef();
	const songScroll = useRef();
	const header = useRef();
	const layer = useRef();
	const musicNoteRef = useRef();

	useEffect(() => {
		const id = props.match.params.id;
		getSingerDataDispatch(id);
		let h = imageWrapper.current.offsetHeight;
	}, []);

	const setShowStatusFalse = useCallback(() => {
		setShowStatus(false);
	}, []);

	const handleScroll = () => {};

	const musicAnimation = (x, y) => {
		musicNoteRef.current.startAnimation({ x, y });
	};

	return (
		<CSSTransition
			in={showStatus}
			timeout={300}
			classNames="fly"
			appear={true}
			unmountOnExit
			onExited={() => props.history.goBack()}
		>
			<Container>
				<Header handleClick={setShowStatusFalse} title={artist.name} ref={header}></Header>
				<ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
					<div className="filter"></div>
				</ImgWrapper>
				<CollectButton ref={collectButton}>
					<i className="iconfont">&#xe62d;</i>
					<span className="text">收藏</span>
				</CollectButton>
				{/* <BgLayer ref={layer}></BgLayer> */}
				<SongListWrapper ref={songScrollWrapper} play={songsCount}>
					<Scroll onScroll={handleScroll} ref={songScroll}>
						<SongsList
							songs={songs}
							showCollect={false}
							usePageSplit={false}
							musicAnimation={musicAnimation}
						></SongsList>
					</Scroll>
				</SongListWrapper>
			</Container>
		</CSSTransition>
	);
}

const mapStateToProps = (state) => ({
	artist: state.getIn(['singerInfo', 'artist']),
	songs: state.getIn(['singerInfo', 'songsOfArtist']),
	loading: state.getIn(['singerInfo', 'loading']),
	// songsCount: state.getIn(['player', 'pakyList']).size,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getSingerDataDispatch(id) {
			dispatch(changeEnterLoading(true));
			dispatch(getSingerInfo(id));
		},
	};
};

// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer));
