import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';

export const changeBannerList = (data) => ({
	type: actionTypes.CHANGE_BANNER,
	data: fromJS(data),
});
export const changeRecommendList = (data) => ({
	type: actionTypes.CHANGE_RECOMMEND_LIST,
	data: fromJS(data),
});
export const changeEnterLoading = (data) => ({
	type: actionTypes.CHANGE_ENTER_LOADING,
	data,
});

export const getBannerList = () => {
	return (dispath) => {
		getBannerRequest()
			.then((data) => {
				dispath(changeBannerList(data.banners));
			})
			.catch(() => {
				console.log('error');
			});
	};
};

// 另外在获取推荐歌单后，应把 loading 状态改为 false
export const getRecommendList = () => {
	return (dispatch) => {
		getRecommendListRequest()
			.then((data) => {
				console.log(data);
				dispatch(changeRecommendList(data.result));
				dispatch(changeEnterLoading(false)); // 改变 loading
			})
			.catch(() => {
				console.log('推荐歌单数据传输错误');
			});
	};
};
