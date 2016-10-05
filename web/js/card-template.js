/**
 * Created by karlpineau on 21/06/2016.
 */

    function hideCardTemplate() {
        $('#card-template').hide();
    }
    function cleanAgentTemplate() {
        $('#agent-template-label').text('Untitled');
        $('#agent-template-src-image').attr('src', 'web/images/no-image.png');
        $('#agent-template-birthdate').text('Unknown');
        $('#agent-template-deathdate').text('Unknown');
        $('#agent-template-birthplace').text('Unknown');
        $('#agent-template-deathplace').text('Unknown');
        $('#agent-template-description').text('There is no description for this item');
        $('#agent-template-profession').text('Unknown');
        $('#agent-template-href-europeana').attr('href','#');
        $('#agent-template-href-dbpedia').attr('href','#');
        $('#agent-template-href-wikidata').attr('href','#');
        $('#agent-template-href-wikipedia').attr('href','#');
    }

    function displayAgentTemplate() {
        cleanAgentTemplate();
        $('#card-template').show();
        hideCHOTemplate();
        hidePlaceTemplate();
        $('#agent-template').show();
    }

    function hideAgentTemplate() {
        $('#agent-template').hide();
    }

    function cleanCHOTemplate() {
        $('#cho-template-label').text('Untitled');
        $('#cho-template-src-image').attr('src', 'web/images/no-image.png');
        $('#cho-template-description').text('There is no description for this item');
        $('#cho-template-creator').text('Unknown');
        $('#cho-template-coverage').text('Unknown');
        $('#cho-template-people').text('Unknown');
        $('#cho-template-publisher').text('Unknown');
        $('#cho-template-href-europeana').attr('href','#');
        $('#cho-template-href-dbpedia').attr('href','#');
        $('#cho-template-href-wikidata').attr('href','#');
        $('#cho-template-href-wikipedia').attr('href','#');
    }

    function displayCHOTemplate() {
        cleanCHOTemplate();
        $('#card-template').show();
        hideAgentTemplate();
        hidePlaceTemplate();
        $('#cho-template').show();
    }

    function hideCHOTemplate() {
        $('#cho-template').hide();
    }

    function cleanPlaceTemplate() {
        $('#place-template-label').text('Untitled');
        $('#place-template-src-image').attr('src', 'web/images/no-image.png');
        $('#place-template-partof').text('Unknown');
        $('#place-template-href-europeana').attr('href','#');
        $('#place-template-href-geoname').attr('href','#');
    }
    
    function displayPlaceTemplate() {
        cleanPlaceTemplate();
        $('#card-template').show();
        hideCHOTemplate();
        hideAgentTemplate();
        $('#place-template').show();
    }
    
    function hidePlaceTemplate() {
        $('#place-template').hide();
    }

    hideCardTemplate();

    function loadCardInterface(node) {
        if(node.type == 'http://www.europeana.eu/schemas/edm/Agent') {
            displayAgentTemplate();

<<<<<<< HEAD


=======
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c
            if(node.dateOfBirth) {
                $('#agent-template-birthdate').text(node.dateOfBirth);
            } else if (node.start) {
                $('#agent-template-birthdate').text(node.start);
            }

            if(node.dateOfDeath) {
                $('#agent-template-deathdate').text(node.dateOfDeath);
            } else if (node.end) {
                $('#agent-template-deathdate').text(node.end);
            }

            var textPlaceOfBirth = '';
            var textPlaceOfDeath = '';
            $.ajax({
                url: "web/js/result.json",
                success: function (data) {
                    var dataPlaceOfBirth = $.grep(data, function (e) {return e.id == node.placeOfBirth;});
                    var dataPlaceOfDeath = $.grep(data, function (e) {return e.id == node.placeOfDeath;});

                    //Definition of tree NAME
                    if (dataPlaceOfBirth[0].prefLabel) {
                        dataPlaceOfBirth[0].name = dataPlaceOfBirth[0].prefLabel;
                    } else if (dataPlaceOfBirth[0].altLabel) {
                        dataPlaceOfBirth[0].name = dataPlaceOfBirth[0].altLabel;
                    } else if (dataPlaceOfBirth[0].title) {
                        dataPlaceOfBirth[0].name = dataPlaceOfBirth[0].title;
                    } else {
                        dataPlaceOfBirth[0].name = "Untitled";
                    }

                    if (dataPlaceOfDeath[0].prefLabel) {
                        dataPlaceOfDeath[0].name = dataPlaceOfDeath[0].prefLabel;
                    } else if (dataPlaceOfDeath[0].altLabel) {
                        dataPlaceOfDeath[0].name = dataPlaceOfDeath[0].altLabel;
                    } else if (dataPlaceOfDeath[0].title) {
                        dataPlaceOfDeath[0].name = dataPlaceOfDeath[0].title;
                    } else {
                        dataPlaceOfDeath[0].name = "Untitled";
                    }

                    textPlaceOfBirth += '<a href="#" link="'+dataPlaceOfBirth[0].id+'" class="linkViz">' + dataPlaceOfBirth[0].name + '</a>';
                    textPlaceOfDeath += '<a href="#" link="'+dataPlaceOfDeath[0].id+'" class="linkViz">' + dataPlaceOfDeath[0].name + '</a>';

                    if(textPlaceOfBirth == '') {textPlaceOfBirth = 'Unknown';}
                    if(textPlaceOfDeath == '') {textPlaceOfDeath = 'Unknown';}

                    $('#agent-template-birthplace').html(textPlaceOfBirth);
                    $('#agent-template-deathplace').html(textPlaceOfDeath);
                    $('.linkViz').on('click', function() {
                        makeViz($(this).attr('link'));
                    });
                }
            });

            $('#agent-template-label').text(node.name);
            $('#agent-template-src-image').attr('src', node.preview);
            $('#agent-template-description').text(node.biographicalInformation);
            $('#agent-template-profession').text('Unknown');
            $('#agent-template-href-europeana').attr('href',node.id);
            $('#agent-template-href-dbpedia').attr('href','#');
            $('#agent-template-href-wikidata').attr('href','#');
            $('#agent-template-href-wikipedia').attr('href','#');
<<<<<<< HEAD
            $('#agent-template-search-europeana').attr('href', "http://www.europeana.eu/portal/search?q="+node.name);
=======
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c
        } else if(node.type == 'http://www.europeana.eu/schemas/edm/ProvidedCHO') {
            displayCHOTemplate();

            var textCreator = '';
            var textSpatial = '';
            $.ajax({
                url: "web/js/result.json",
                success: function (data) {
                    for(creatorId in node.creator) {
                        var dataCreator = $.grep(data, function (e) {return e.id == node.creator[creatorId];});
                        //Definition of tree NAME
                        if (dataCreator[0].prefLabel) {
                            dataCreator[0].name = dataCreator[0].prefLabel;
                        } else if (dataCreator[0].altLabel) {
                            dataCreator[0].name = dataCreator[0].altLabel;
                        } else if (dataCreator[0].title) {
                            dataCreator[0].name = dataCreator[0].title;
                        } else {
                            dataCreator[0].name = "Untitled";
                        }

                        if(creatorId > 0) {textCreator += ', ';}
                        textCreator += '<a href="#" link="'+dataCreator[0].id+'" class="linkViz">' + dataCreator[0].name + '</a>';
                    }
                        if(textCreator == '') {textCreator = 'Unknown';}
                    $('#cho-template-creator').html(textCreator);
                    $('.linkViz').on('click', function() {
                        makeViz($(this).attr('link'));
                    });

                    var dataSpatial = $.grep(data, function (e) {return e.id == node.spatial;});
                    //Definition of tree NAME
<<<<<<< HEAD
                    if(dataSpatial.length > 0) {
                        if (dataSpatial[0].prefLabel) {
                            dataSpatial[0].name = dataSpatial[0].prefLabel;
                        } else if (dataSpatial[0].altLabel) {
                            dataSpatial[0].name = dataSpatial[0].altLabel;
                        } else if (dataSpatial[0].title) {
                            dataSpatial[0].name = dataSpatial[0].title;
                        } else {
                            dataSpatial[0].name = "Untitled";
                        }

                        textSpatial += '<a href="#" link="'+dataSpatial[0].id+'" class="linkViz">' + dataSpatial[0].name + '</a>';
                        $('#cho-template-spatial').html(textSpatial);
                        $('.linkViz').on('click', function() {
                            makeViz($(this).attr('link'));
                        });
                    } else {
                        textSpatial += 'No spatial';
                        $('#cho-template-spatial').html(textSpatial);
                    }
=======
                    if (dataSpatial[0].prefLabel) {
                        dataSpatial[0].name = dataSpatial[0].prefLabel;
                    } else if (dataSpatial[0].altLabel) {
                        dataSpatial[0].name = dataSpatial[0].altLabel;
                    } else if (dataSpatial[0].title) {
                        dataSpatial[0].name = dataSpatial[0].title;
                    } else {
                        dataSpatial[0].name = "Untitled";
                    }

                    textSpatial += '<a href="#" link="'+dataSpatial[0].id+'" class="linkViz">' + dataSpatial[0].name + '</a>';
                    $('#cho-template-spatial').html(textSpatial);
                    $('.linkViz').on('click', function() {
                        makeViz($(this).attr('link'));
                    });
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c
                }
            });

            $('#cho-template-label').text(node.name);
            $('#cho-template-src-image').attr('src', node.preview);
            $('#cho-template-description').text(node.description);
            $('#cho-template-coverage').text(node.coverage);
            $('#cho-template-people').text('Unknown');
            $('#cho-template-publisher').text(node.publisher);
            $('#cho-template-href-europeana').attr('href',node.id);
            $('#cho-template-href-dbpedia').attr('href','#');
            $('#cho-template-href-wikidata').attr('href','#');
            $('#cho-template-href-wikipedia').attr('href','#');
<<<<<<< HEAD
            $('#cho-template-search-europeana').attr('href', "http://www.europeana.eu/portal/search?q="+node.name);
=======
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c
        } else if(node.type == 'http://www.europeana.eu/schemas/edm/Place') {
            displayPlaceTemplate();

            var textPartOf = '';
            $.ajax({
                url: "web/js/result.json",
                success: function (data) {
                    var dataIsPartOf = $.grep(data, function (e) {return e.id == node.isPartOf;});
                    //Definition of tree NAME
                    if (dataIsPartOf[0].prefLabel) {
                        dataIsPartOf[0].name = dataIsPartOf[0].prefLabel;
                    } else if (dataIsPartOf[0].altLabel) {
                        dataIsPartOf[0].name = dataIsPartOf[0].altLabel;
                    } else if (dataIsPartOf[0].title) {
                        dataIsPartOf[0].name = dataIsPartOf[0].title;
                    } else {
                        dataIsPartOf[0].name = "Untitled";
                    }

                    if(dataIsPartOf[0].id != node.id) {textPartOf += '<a href="#" link="'+dataIsPartOf[0].id+'" class="linkViz">' + dataIsPartOf[0].name + '</a>';}
                    else {textPartOf = 'Unknown';}

                    $('#place-template-partof').html(textPartOf);
                    $('.linkViz').on('click', function() {
                        makeViz($(this).attr('link'));
                    });
                }
            });

            $('#place-template-label').text(node.name);
            $('#place-template-src-image').attr('src', node.preview);
            $('#place-template-partof').text(node.isPartOf);
            $('#place-template-href-europeana').attr('href',node.id);
            $('#place-template-href-geoname').attr('href',node.sameAs[0]);
<<<<<<< HEAD
            $('#place-template-search-europeana').attr('href', "http://www.europeana.eu/portal/search?q="+node.name);
=======
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c
        }
    }