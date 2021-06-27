import React, { useEffect, useState } from 'react';
import classes from "./LandingPage.module.css";
import axiosV1 from "./axiosV1";
import * as endpoints from "./endpoints";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import calendarIcon from './calendar.png';

const LandingPage = ()=>{
    const apikey =`qoPtuQnVcBJqgv5YJp1nJsXrX1RlkAd0`;
    const monthsArray = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const [newsResponse, setnewsResponse] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedNewsObj, setselectedNewsObj] = useState({});
    const [dateRangeState, setDateRangeState] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
    const [startDate, setstartDate] = useState(null);
    const [endDate, setendDate] = useState(null);
    const [nextPage, setnextPage] = useState('');
    const [isModalVisibile, setisModalVisibile] = useState(false);
    const [filterCount, setfilterCount] = useState(1);

    // let qparam = `?x-api-key=${apikey}&q=${searchQuery}`;
    
    const getQueryParams = () => {
        let startDateQparam = (startDate!==null)?`&start_date=${startDate}`:'';
        let endDateQparam = (endDate!==null)?`&end_date=${endDate}`:'';
        let searchQparam = `&q=${searchQuery}`;

        let finalQparam = `?x-api-key=${apikey}`+searchQparam+startDateQparam+endDateQparam;
        return finalQparam;
    }
    const getNewsData = (queryParams) => {
        axiosV1
        .get(`${endpoints.getNews}${queryParams}`)
        .then((response) => {
            console.log("response >>",response.data.result);
            let newsResult = response.data.result;
            setnewsResponse(newsResult);
            setnextPage(newsResult.nextUrl);
        })
        .catch((error) => {
            console.log("Error >>",error);
        });
    }

    const getFormattedDate = (dateString) => {
        if(dateString !== null && dateString !== undefined){
            let finalDate = [];
            finalDate = dateString.substring(0,10).split('-');
            let year='',month='',day='';
            year=finalDate[0];
            month=Number(finalDate[1]);
            day=finalDate[2];

            month = monthsArray[month-1];

            let newDate = month+' '+day+' , '+year;

            return newDate;
        }
    }

    const getRequestFormatDate = (dateString) => {
        let thisDate = dateString.split('/');
        let finalDate = thisDate[2]+'-'+thisDate[0]+'-'+thisDate[1];
        return finalDate;
    }

    useEffect(() => {
        let finalQparam = getQueryParams();
        getNewsData(finalQparam);
    }, [searchQuery,startDate]);

    let newsLists = null, detailedNews = null;
    let bodySectionView = <div>Loading ...</div>;

    if(Object.keys(selectedNewsObj).length<=0){
        if(Object.keys(newsResponse).length>0){
            console.log("Brooo>>",newsResponse.data[0]);
            setselectedNewsObj(newsResponse.data[0]);
        }
    }

    detailedNews = <div className={classes.MainNewsSection}>
            <div className={classes.MainNewsTitle}>
                {selectedNewsObj?.title}
            </div>
            <div >
                <div><a href={selectedNewsObj?.url}>{selectedNewsObj?.publication}</a></div>
                <div>{getFormattedDate(selectedNewsObj?.date)}</div>
            </div>
            <div className={classes.NewsBody}>
                {selectedNewsObj?.content} 
            </div>
        </div>;

    const setDateQueryParam = () =>{
        let startDate = getRequestFormatDate(dateRangeState[0].startDate.toLocaleDateString());
        let endDate = getRequestFormatDate(dateRangeState[0].endDate.toLocaleDateString());
        // let qparams = qparam+`&start_date=${startDate}&end_date=${endDate}`;
        setstartDate(startDate);
        setendDate(endDate);
        document.getElementById('DateRangeSelector').style.display='none';
    }

    const getFilterSection = () => {
        
        return (
        <>
            {[...Array(filterCount)].map((index) => (
                <div className={classes.FilterSection} key={index}>
                    <select name="cars" id="cars">
                        <option value="Category">Category</option>
                        <option value="Sentiment">Sentiment</option>
                        <option value="Source">Source</option>
                    </select>
                    <div className={classes.inputSearchSection}>
                        <span>{' is '}</span>
                        <input placeholder="Search ..." />
                        <div className={classes.autoSuggestion}>
                            hello
                        </div>
                    </div>
                </div>
            ))}
        </>
        )
    }

    const getMainFilterSection = () => {
        // let view='';
        // for(let i=0;i<filterCount;i++){
        //     view = getFilterSection();
        // }
        // return view;
    }

    if(Object.keys(newsResponse).length>0){
        let newsData = newsResponse.data;
        newsLists = newsData.map((eachNews) => {
            let sentColor='grey';
            if(eachNews.sentiment === "Negative"){
                sentColor='red';
            }else if(eachNews.sentiment === "Positive"){
                sentColor='green';
            }
            return(
                <div className={classes.eachArticle} onClick={()=>{setselectedNewsObj(eachNews)}}>
                    <p>{getFormattedDate(eachNews.date)}</p>
                    <p >{eachNews.title}</p>
                    <div className={classes.articleBottom}>
                        <span className={classes.Dot} style={{backgroundColor:`${sentColor}`}}></span>
                        <span>{eachNews.publication}</span>
                    </div>
                </div>
            )
        });

        bodySectionView = 
        <div className={classes.BodySection}>
                {/* Left Sidebar */}
                
            <div className={classes.NewsListSection}>
                <div className={classes.DateRangeInputSection}>
                    <p>Select Date Range</p>
                    <span><img src={calendarIcon} className={classes.calendarIcon}
                            onClick={() => {
                                document.getElementById('DateRangeSelector').style.display='block';
                            }}
                    /></span>
                </div>
                <div className={classes.DateRangeSection} id={'DateRangeSelector'} onMouseLeave={() => {
                    document.getElementById('DateRangeSelector').style.display='none';
                }}>
                    <DateRange
                        editableDateInputs={true}
                        onChange={item => setDateRangeState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRangeState}
                    />
                    <div className={classes.DateRangeBtn}>
                        <button onClick={() => {
                            setstartDate(null);
                            setendDate(null);
                            document.getElementById('DateRangeSelector').style.display='none';
                        }} className={classes.BtnMedium}>Clear</button>
                        <button onClick={setDateQueryParam} className={classes.BtnMedium}>Apply</button>
                    </div>
                </div>
                {newsLists}
                <br/>
                <button className={classes.BtnMedium} onClick={()=>{
                    let nextPageUrl = nextPage;
                    nextPageUrl = nextPageUrl.split('http://get.scrapehero.com/news-api/news/');
                    let finalurl = nextPageUrl[1]+`&x-api-key=${apikey}`;
                    getNewsData(finalurl);
                }}>Next</button>
            </div>

            {/* Main Detailed ZNews */}
            {detailedNews}
        </div>
    }

    return (
        <div>
            {isModalVisibile && 
            <div className={classes.OuterModalContainer}>
                <div className={classes.ModalContainer}>
                    <div className={classes.ModalHeader}>
                        <h5>Advanced Search</h5>
                        <span className={classes.Close} onClick={() => setisModalVisibile(false)}>{' X '}</span>
                    </div>
                    <div className={classes.ModalBodyContainer}>
                        <div>
                            <button className={classes.AddFilter} onClick={() => setfilterCount(filterCount+1)}
                            >Add New Filter</button>
                        </div>
                        {getFilterSection()}
                    </div>
                    <div className={classes.ModalBottomContainer}>
                        <button className={classes.BtnCancel} onClick={() => setisModalVisibile(false)}>Cancel</button>
                        <button className={classes.BtnMedium}onClick={() => setisModalVisibile(false)}>Show Results</button>
                    </div>
                </div>
            </div>}
            {/* Header Section */}
            <div className={classes.HeaderSection}>
                <h1>NewsReader</h1>
                <div>
                <div className={classes.SearchSection}>
                    <i className="fa fa-search"></i>
                    <input type="text" placeholder="Search here..." onKeyDown={(e) => {
                            if(e.key === 'Enter')
                            setSearchQuery(e.target.value)
                        }
                    }/>
                    <i className={[classes.arrow, classes.down].join(" ")}></i>
                </div>
                <button className={classes.BtnBig} onClick={() => setisModalVisibile(true)}>Advanced Search</button>
                </div>
            </div>
        
            {bodySectionView}
        </div>
    )
}

export default LandingPage;
