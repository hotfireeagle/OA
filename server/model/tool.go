package model

type ResponseCode int

const (
	Err ResponseCode = iota
	Success
	NeedLogin
	UnAuth
)

type Response struct {
	Code ResponseCode `json:"code"`
	Msg  string       `json:"msg"`
	Data interface{}  `json:"data"`
}

// FIXME: check and delete under shit

type PaginationQueryData struct {
	Current  int `json:"current"`
	PageSize int `json:"pageSize"`
	Offset   int
	Limit    int
}

type PaginationData struct {
	Current  int         `json:"current"`
	PageSize int         `json:"pageSize"`
	Total    int64       `json:"total"`
	List     interface{} `json:"list"`
}

func newPaginationData(c int, ps int, t int64, arr interface{}) *PaginationData {
	return &PaginationData{
		Current:  c,
		PageSize: ps,
		Total:    t,
		List:     arr,
	}
}

func pageSize(l int) int {
	if l <= 0 {
		return 10
	}
	return l
}

func current(c int) int {
	if c <= 0 {
		return 1
	}

	return c
}
