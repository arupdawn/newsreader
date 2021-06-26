import React from 'react';
import classes from "./LandingPage.module.css";

function LandingPage() {
    return (
        <div>
            {/* Header Section */}
            <div className={classes.HeaderSection}>
                <h1>NewsReader</h1>
                <div>
                <div className={classes.SearchSection}>
                    <i className="fa fa-search"></i>
                    <input type="text" placeholder="Search here..."/>
                    <i className={[classes.arrow, classes.down].join(" ")}></i>
                </div>
                <button className={classes.BtnBig}>Advanced Search</button>
                </div>
            </div>
        
            <div className={classes.BodySection}>
                 {/* Left Sidebar */}
                <div className={classes.NewsListSection}>
                    <div>
                        
                    </div>
                    <div className={classes.eachArticle}>
                        <p>June 24, 2021</p>
                        <p>Some instacart and Amazon Workers Stay Home, 
                            Calling for More Pay in Coronavirus pandemic</p>
                        <div className={classes.articleBottom}>
                            <span className={classes.Dot}></span>
                            <span>NZ Herald</span>
                        </div>
                    </div>
                    <div className={classes.eachArticle}>
                        <p>June 24, 2021</p>
                        <p>Some instacart and Amazon Workers Stay Home, 
                            Calling for More Pay in Coronavirus pandemic</p>
                        <div className={classes.articleBottom}>
                            <span className={classes.Dot}></span>
                            <span>NZ Herald</span>
                        </div>
                    </div>
                    <div className={classes.eachArticle}>
                        <p>June 24, 2021</p>
                        <p>Some instacart and Amazon Workers Stay Home, 
                            Calling for More Pay in Coronavirus pandemic</p>
                        <div className={classes.articleBottom}>
                            <span className={classes.Dot}></span>
                            <span>NZ Herald</span>
                        </div>
                    </div>
                    <div className={classes.eachArticle}>
                        <p>June 24, 2021</p>
                        <p>Some instacart and Amazon Workers Stay Home, 
                            Calling for More Pay in Coronavirus pandemic</p>
                        <div className={classes.articleBottom}>
                            <span className={classes.Dot}></span>
                            <span>NZ Herald</span>
                        </div>
                    </div>
                </div>

                {/* Main Detailed ZNews */}
                <div className={classes.MainNewsSection}>
                    <div className={classes.MainNewsTitle}>
                        Some instacart and Amazon Workers Stay Home, 
                            Calling for More Pay in Coronavirus pandemic
                    </div>
                    <div >
                        <div><a href={'#'}>NZ Herald</a></div>
                        <div>June 24, 2021</div>
                    </div>
                    <div className={classes.NewsBody}>
                        I just received an email that appeared to be from an old friend, but it did not seem legit. 
                        It claimed he was having trouble with his knees.
                        I just received an email that appeared to be from an old friend, but it did not seem legit. 
                        It claimed he was having trouble with his knees and 
                        I just received an email that appeared to be from an old friend, but it did not seem legit. 
                        It claimed he was having trouble with his knees and 
                        I just received an email that appeared to be from an old friend, but it did not seem legit. 
                        It claimed he was having trouble with his knees and 
                        I just received an email that appeared to be from an old friend, but it did not seem legit. 
                        It claimed he was having trouble with his knees and 
                        I just received an email that appeared to be from an old friend, but it did not seem legit. 
                        It claimed he was having trouble with his knees and 
                        I just received an email that appeared to be from an old friend, but it did not seem legit. 
                        It claimed he was having trouble with his knees and 
                        I just received an email that appeared to be from an old friend, but it did not seem legit. 
                        It claimed he was having trouble with his knees and 
                        I just received an email that appeared to be from an old friend, but it did not seem legit. 
                        It claimed he was having trouble with his knees and 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
