import React from 'react'

const SearchKeyword = (props) => (
    <>
        <h5>Keyword</h5>
        <div className="card">
            <div className="card-body">
                <form className="w-100" onSubmit={props.onClickAddToCriteria}>
                <div className="form-row">
                    <div className="col-10">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Type keyword i.e:  restaurant's name, location, cuisine, etc"
                            value={props.keyword}
                            onChange={props.changeKeywordHandler}
                        />
                    </div>
                    <div className="col-2">
                        <button className="btn btn-primary" type="submit" onClick={props.onClickAddToCriteria}>
                            Add to criteria
                        </button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </>
)

export default SearchKeyword
