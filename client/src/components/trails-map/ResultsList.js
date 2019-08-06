import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import logo from "../../img/mountain.png";
import ResultsCard from "./ResultsCard"
// import { connect } from 'react-redux'

const ResultsList = ({ trails, isAuthenticated }) => (
    <Fragment>
        <div className="trail-list-flex" style={(trails.length > 0) ? { width: "500px", transistionDelay: "0s" } : { width: "0px", transistionDelay: "5s" }}>
            <div>
                {trails.length > 0 && (
                    trails.map((index, i) => {
                        return (
                            <ResultsCard
                                key={i}
                                title={trails[i].name}
                                length={trails[i].length}
                                ascent={trails[i].ascent}
                                embed={trails[i].imgMedium ? trails[i].imgMedium : logo}
                                data={trails[i]}
                                trailItemClick={() => console.log("item clicked")}
                                isAuthenticated={isAuthenticated}
                                // trailSelect={trailSelect}
                                actionText={"Save"}
                                // alreadySaved={saved && saved.filter(item => { return item.id === trails[i].id })}
                                alreadySaved={false}
                            />
                        );
                    })
                )}
            </div>
        </div>
    </Fragment>
);
ResultsList.propTypes = {
    trails: PropTypes.array.isRequired,
}
export default ResultsList;