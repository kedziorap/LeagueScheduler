$(function(){
    var getTeams = [],
        teamAmount = 0,
        schedule = [],
        matchDay = [],
        home = [],
        away = [],
        teams = [], //always random order
        oddTeams = false,
        separator = 'vs.',
        counter = 0;
    //TEST AREA
    /*
    function resultString() {
        var result = '\n';
        for(var i = 0; i<schedule.length; i++) {
            result+='\nKolejka '+(i+1)+'\n';
            for (var j = 0; j<schedule[j].length; j++) {
                result+=schedule[i][j][0]+' vs '+schedule[i][j][1]+'\n';
            }
        }   
        return result;
    }*/
    //END OF TEST
    $('#generateSchedule').click(function() {
        $('#schedulePlace').empty();
        teamAmount = getTeams.length;
        teams = mixIt(getTeams);
        if (teamAmount >= 3) {
            checkAmountOfTeams();
            oddMatchday();
            evenMatchday();
            showScheduler();
        } else {
            alert('You need at least 3 teams to generate schedule');
        }
    });
    $('#addTeam').click(function(e) {
        e.preventDefault();
        var teamName = $('#teamName').val();
        if (teamName.trim() == '' || teamName == 0) {
            alert('Incorrect team name!');
        } else {
            $('#listTeam').append('<li class="list-group-item">'+teamName+'</li>');
            counter++;
            $('#teamAmount').text(counter);
            getTeams.push(teamName);
            $('#teamName').val('');   
        }
    });
    $('#clearList').click(function() {
        counter = 0;
        teamAmount = 0;
        getTeams = [];
        oddTeams = false;
        schedule = [];
        $('#listTeam').html('');
        $('#teamAmount').text(counter);
    });
    function showScheduler() {
        var result = '';
        var pauseMatch = '';
        for(var i = 0; i<schedule.length; i++) {
            result += '<table id="matchday-' + i + '" class="table table-striped table-hover text-center"><thead><tr><th colspan="3" class="text-center">Matchday '+(i+1)+'</th></tr></thead><tbody>';
            for (var j = 0; j<schedule[j].length; j++) {
                if (schedule[i][j][0] == 0 || schedule[i][j][1]==0) {
                    pauseMatch = schedule[i][j];
                    var team = '';
                    (schedule[i][j][0] == 0)? team = schedule[i][j][1] : team = schedule[i][j][0];
                    pauseMatch = '<tr><td colspan="3">Pause: ' + team + '</td></tr>';
                    continue;
                }
                result+='<tr><td width="45%">' + schedule[i][j][0] + '</td><td>' + separator + '</td><td width="45%">' + schedule[i][j][1] + '</td></tr>';
            }
            result += pauseMatch+'</tbody></table>';
        }   
        $('#schedulePlace').html(result);
    }
    function checkAmountOfTeams() {
        if (!(teamAmount % 2 === 0)) {
            oddTeams = true;
            teams.push(0);
            teamAmount++;
        }
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
        for (var i = 2; i < teamAmount; i+=2) {
            away.splice(1,0, home.shift());
            home.push(away.pop());
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
});