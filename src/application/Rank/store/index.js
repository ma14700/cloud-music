import { fromJS } from 'immutable';
import { getRankListRequest } from '../../../api/request';

export const CHANGE_RANK_LIST = 'home/rank/CHANGE_RANK_LIST';
export const CHANGE_LOADING = 'home/rank/CHANGE_LOADING';

const changeRankList = (data) => ({
	type: CHANGE_RANK_LIST,
	data: fromJS(data),
});
