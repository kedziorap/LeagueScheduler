$(function(){
    var getTeams = ['Pogon','Legia','Arka','Lech','Widzew','Wisła','Termalica','ŁKS','Cracovia'],
        teamAmount = getTeams.length,
        schedule = [],
        matchDay = [],
        home = [],
        away = [],
        teams = mixIt(getTeams), //always random order
        oddTeams = false;
    //TEST AREA
    console.log(teams);
    checkAmountOfTeams();
    oddMatchday();
    evenMatchday();
    console.log(resultString());
    
    
    
    //END OF TEST
    function checkAmountOfTeams() {
        if (!(teamAmount % 2 === 0)) {
            oddTeams = true;
            teams.push(0);
            teamAmount++;
        }
        console.log(oddTeams);
    }
    function mixIt(tab) {
        var toChange = tab.slice();
        var resultTab = [];
        for (var i = 0, size = tab.length; i < size; i++) {
            var draw = Math.floor(Math.random()*toChange.length);
            resultTab.push(toChange[draw]);
            toChange.splice(draw, 1);
        }
        return resultTab;
    }
    function oddMatchday() {
        home = teams.slice(0, teamAmount/2);
        away = teams.slice(teamAmount/2).reverse();
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
        home = teams.slice(0, teamAmount/2);
        away = teams.slice(teamAmount/2).reverse();
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
        if (oddTeams) {
            var firstMatch = matchDay.shift();
            var tabOdd = mixIt(matchDay);
            tabOdd.unshift(firstMatch);
            schedule[nrMatchday] = tabOdd;
        } else {
            schedule[nrMatchday] = mixIt(matchDay);   
        }
    }
    function resultString() {
        var result = '\n';
        for(var i = 0; i<schedule.length; i++) {
            result+='Kolejka '+(i+1)+'\n';
            for (var j = 0; j<schedule[j].length; j++) {
                result+=schedule[i][j][0]+' vs '+schedule[i][j][1]+'\n';
            }
        }   
        return result;
    }
});