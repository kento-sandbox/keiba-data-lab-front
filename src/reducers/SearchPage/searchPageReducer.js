import * as types from '../../types';

const defaultState = {
  // テーブル設定
  tableTitle: 'レース結果検索',
  tableColumns: ['開催日', '開催地', 'レース名', '距離', '着順', '馬名', '性別', '年齢', '馬体重', 'タイム', '人気', 'オッズ'],
  tableOptions: {
    filterType: 'dropdown',
    responsive: 'stacked',
    textLabels: {
      body: {
        noMatch: 'データは存在しません',
        toolTip: 'ソート',
      },
      pagination: {
        next: '次へ',
        previous: '前へ',
        rowsPerPage: '表示行数:',
        displayRows: '　合計：',
      },
      toolbar: {
        search: '検索',
        downloadCsv: 'CSV ダウンロード',
        print: '印刷',
        viewColumns: 'カラム表示切替',
        filterTable: 'フィルターリスト',
      },
      filter: {
        all: '全件',
        title: 'フィルター',
        reset: 'クリア',
      },
      viewColumns: {
        title: '表示切替',
        titleAria: '表示/非表示',
      },
      selectedRows: {
        text: '行を選択',
        delete: '削除',
        deleteAria: '選択行を削除',
      },
    },
  },
  // 検索ボックス設定
  labelText: '検索文字列',
  placeholderText: 'Enterキーで検索実行',
  // 検索文字列
  searchWord: '',
  // 検索結果
  searchList: [],
  // 処理結果ダイアログタイトル
  resultDialogTitle: '',
  // 処理結果内容
  resultDialogMessage: '',
  // 処理結果表示フラグ
  isResultDialogOpen: false,
  // ロードダイアログ表示フラグ
  isLoadingDialogOpen: false,
  // プログレスバーの色
  progressColor: 'secondary',
};

const searchPageReducer = (state = defaultState, action) => {
  switch (action.type) {
    // 検索文字列変更時
    case types.CHANGE_SEARCH_WORD:
      return {
        ...state,
        searchWord: action.searchWord,
      };
    // 検索正常終了時
    case types.SUCCESS_SEARCH:
      console.log(action.searchedList)
      let raceResults = [];
      if (action.searchedList) {
        let raceResult = null;
        Object.keys(action.searchedList).forEach(key => {
          raceResult = action.searchedList[key];
          if (raceResult.Date === state.searchWord || state.searchWord === '') {
            raceResults.push([
              raceResult.Date,
              raceResult.Venue,
              raceResult.Race_name,
              raceResult.Distance,
              raceResult.Order_of_finish,
              raceResult.Horse_name,
              raceResult.Sex,
              raceResult.Age,
              raceResult.Horse_weight,
              raceResult.Time,
              raceResult.Odds_order,
              raceResult.Odds,
            ]);
          }
        });
      }
      return {
        ...state,
        isLoadingDialogOpen: false,
        searchedList: [...raceResults],
      };
    // 検索異常終了時
    case types.FAILED_SEARCH:
      return {
        ...state,
        isLoadingDialogOpen: false,
        resultDialogTitle: action.title,
        resultDialogMessage: action.message,
        isResultDialogOpen: true,
      };
    // 検索実行時
    case types.REQUEST_PROCESS:
      return {
        ...state,
        isLoadingDialogOpen: true,
      };
    // アラートメッセージ変更処理
    case types.CHANGE_ALERT_MESSAGE:
      return {
        ...state,
        resultDialogTitle: '',
        resultDialogMessage: '',
        isResultDialogOpen: false,
      };
    default:
      return state;
  }
};

export default searchPageReducer;
