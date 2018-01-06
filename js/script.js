$(function(){
    var teamNumbers = [1,2,3,4,5,6,7,8,9,10],
        teamAmount = teamNumbers.length,
        schedule = [],
        matchDay = [],
        home = [],
        away = [];
    function oddMatchday() {
        home = teamNumbers.slice(0, teamAmount/2);
        away = teamNumbers.slice(teamAmount/2).reverse();
        addMatchToMatchday(home, away, 0);
        //console.log(away);
        //console.log(home);
        for (var i = 2; i < teamAmount; i+=2) {
            away.splice(1,0, home.shift());
            home.push(away.pop());
            //console.log(away);
            //console.log(home);
            addMatchToMatchday(home, away, i);
        }
    }
    function evenMatchday() {
        home = teamNumbers.slice(0, teamAmount/2);
        away = teamNumbers.slice(teamAmount/2).reverse();
        home.unshift(away.shift());
        away.push(home.pop());
        addMatchToMatchday(home, away, teamAmount-3);
        for (var i = teamAmount - 5; i > 0; i -= 2) {
            home.splice(1,0,away.shift());
            away.push(home.pop());
            addMatchToMatchday(home, away, i);
        }
    }
    function addMatchToMatchday(homeTeam, awayTeam, nrMatchday) {
        matchDay = []; //reset old data
        for (var i = 0; i < homeTeam.length; i++) {
            matchDay.push([homeTeam[i],awayTeam[i]]);
        }
        schedule[nrMatchday] = matchDay;
    }
    oddMatchday();
    evenMatchday();
    console.log(schedule);
});