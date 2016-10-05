/**
 * Created by karlpineau on 22/06/2016.
 */
function makeViz(nodeId) {
    $('#viz > svg').html('');
    $.ajax({
        url: "web/js/result.json",
        success: function (data) {
            drawOrbit(treeConvert(nodeId, data));
        }
    });
}

function drawOrbit(_data) {
    loadCardInterface(_data);

    colorScale = d3.scale.linear().domain([0,1,2,3,4]).range(["rgb(161,208,120)","rgb(247,148,72)","rgb(225,203,208)","rgb(174,223,228)","rgb(245,132,102)"]);
    subColorScale = d3.scale.linear().domain([0,1,2,3,4]).range(["rgb(140,208,120)","rgb(200,148,72)","rgb(200,203,208)","rgb(100,223,228)","rgb(200,132,102)"]);

    orbit = d3.layout
        .orbit()
        .size([800,650])
        //.revolution(customRevolution)
        //.orbitSize(function(d) {return d.depth >= 2 ? 6 : 4}) //-> need if rotation
        //.speed(.25)
        .mode([35,36,8,3,1])
        .nodes(_data)
        .subNodes(_data);

    //center = orbit.nodes()[0];

    d3.select("svg")
        .append("g")
        .attr("class", "viz")
        .selectAll("g.node").data(orbit.nodes())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {return "translate(" +d.x +"," + d.y+")"})
        .on("mouseover", nodeOver)
        .on("click", nodeClick)

    d3.select("g.viz")
        .selectAll("g.sub-node").data(orbit.subNodes())
        .enter()
        .append("g")
        .attr("class", "sub-node")
        .attr("role", function(d) {return d.depth})
        .attr("transform", function(d) {return "translate(" +(d.x) +"," + (d.y)+")"})
        .on("mouseover", subNodeOver)

    d3.selectAll("g.node")
        .append('defs')
        .append('pattern')
        .attr('id', function(d) {return d.id+'#image'})
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('height', 200)
        .attr('width', 200)
        .attr('x', -50)
        .attr('y', -50)
        .append('image')
        .attr('x', -50)
        .attr('y', -50)
        .attr('height', 200)
        .attr('width', 200)
        .attr('xlink:href', function(d) {return d.preview})

    d3.selectAll("g.node")
        .append("circle")
        .attr("class", "satellite")
        .attr("r", 35)
        .attr("fill", function(d) {return 'url(#'+d.id+'#image)'})
        .style("stroke", "brown")
        .style("stroke-width", "1px")

    d3.selectAll("g.sub-node")
        .append("circle")
        .attr("class", "satellite")
        .attr("r", 25)
        .style("fill", function(d) {return subColorScale(d.depth)})
        .style("stroke", "brown")
        .style("stroke-width", "1px")

    $('g.sub-node[role="0"]').hide();



    //orbit.on("tick", orbitTick);

    orbit.start();

    /*function orbitTick() {

        var newX = 400 - center.x;
        var newY = 400 - center.y;

        d3.select("g.viz")
            .attr("transform", "scale("+(1 + (center.depth *.1)) +") translate(" + newX + "," + newY + ")")


        d3.selectAll("g.node")
            .attr("transform", function(d) {return "translate(" +d.x +"," + d.y+")"});

        d3.selectAll("line.visible")
            .attr("x1", function(p) {return p.source.x})
            .attr("x2", function(p) {return p.target.x})
            .attr("y1", function(p) {return p.source.y})
            .attr("y2", function(p) {return p.target.y})

    }*/

    function nodeReset() {
        d3.selectAll("text.sat").remove();
        d3.selectAll("line.visible").remove();
        d3.selectAll("g.node > circle").style("stroke", "brown").style("stroke-width", 1);
        d3.selectAll("g.sub-node > circle").style("stroke", "brown").style("stroke-width", 1);
<<<<<<< HEAD
        $('#boxRelation').addClass('hidden');
=======
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c
    }

    function nodeOver(d) {
        var
            markerWidth = 6,
            markerHeight = 6,
            cRadius = 30, // play with the cRadius value
            refX = cRadius + (markerWidth * 2),
            refY = -Math.sqrt(cRadius);

        nodeReset();

        if (d.children) {
            var lines = d.children.map(function(p) {return {source: d, target: p}})
            d3.select("g.viz").selectAll("line.visible")
                .data(lines)
                .enter()
<<<<<<< HEAD
=======
                /*.insert("defs", "g")
                .insert("marker")
                .attr('id', function(d) {return d.id+'arrow'})
                .attr('markerWidth', 10)
                .attr('markerHeight', 10)
                .attr('refx', -100)
                .attr('refy', -100)
                .attr('orient', 'auto')
                .attr('markerUnits', 'strokeWidth')
                .insert("path")
                .attr('d', 'M0,0 L0,6 L9,3 z')
                .attr('fill', '#f00')*/
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c
                .insert("line", "g")
                .attr("x1", function(p) {return p.source.x})
                .attr("x2", function(p) {return p.target.x})
                .attr("y1", function(p) {return p.source.y})
                .attr("y2", function(p) {return p.target.y})
                .attr("class", "visible")
                .attr('marker-start', function(d) {return 'url(#'+d.id+'arrow)'})
                .style("stroke", "rgb(73,106,154)")
                .style("stroke-width", 2)
        }

        if (d.parent) {
            d3.select("g.viz").selectAll("line.fake")
                .data([{source:d, target: d.parent}])
                .enter()
<<<<<<< HEAD
=======
                /*.insert("defs", "g")
                .insert("marker")
                .attr('id', function(d) {return d.id+'arrow'})
                .attr('markerWidth', 10)
                .attr('markerHeight', 10)
                .attr('refx', -100)
                .attr('refy', -100)
                .attr('orient', 'auto')
                .attr('markerUnits', 'strokeWidth')
                .insert("path")
                .attr('d', 'M0,0 L0,6 L9,3 z')
                .attr('fill', '#f00')*/
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c
                .insert("line", "g")
                .attr("x1", function(p) {return p.source.x})
                .attr("x2", function(p) {return p.target.x})
                .attr("y1", function(p) {return p.source.y})
                .attr("y2", function(p) {return p.target.y})
                .attr("class", "visible")
                .attr('marker-start', function(d) {return 'url(#'+d.id+'arrow)'})
                .style("stroke", "rgb(165,127,124)")
<<<<<<< HEAD
                .style("stroke-width", 3);

            var link = d.link;
            $('#relationHere').text(link);
            $('#boxRelation').removeClass('hidden');

=======
                .style("stroke-width", 3)
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c
        }

        d3.selectAll("g.node")
            .filter(function(p) {return p == d || p == d.parent || (d.children ? d.children.indexOf(p) > -1 : false)})
            .append("text")
            .text(function(p) {return p.name})
            .style("text-anchor", "middle")
            .attr("y", 15)
            .attr("class", "sat")
            .style("fill", "none")
            .style("stroke", "white")
            .style("stroke-width", 3)
            .style("stroke-opacity", .7);

        d3.selectAll("g.node")
            .filter(function(p) {return p == d || p == d.parent || (d.children ? d.children.indexOf(p) > -1 : false)})
            .append("text")
            .text(function(p) {return p.name})
            .style("text-anchor", "middle")
            .attr("y", 15)
            .attr("class", "sat");

        d3.select(this).select("circle").style("stroke", "black").style("stroke-width", 3);
    }

    function subNodeOver(d) {
        nodeReset();

        if (d.links) {
            console.log('ok');
            var lines = d.links.map(function(p) {return {source: d, target: p}})
            d3.select("g.viz").selectAll("line.visible")
                .data(lines)
                .enter()
                .insert("line", "g")
                .attr("x1", function(p) {return p.source.x})
                .attr("x2", function(p) {return p.target.x})
                .attr("y1", function(p) {return p.source.y})
                .attr("y2", function(p) {return p.target.y})
                .attr("class", "visible")
                .style("stroke", "rgb(73,106,154)")
                .style("stroke-width", 2)
        }

        d3.selectAll("g.sub-node")
            .filter(function(p) {return p == d || p == d.parent || (d.subChildren ? d.subChildren.indexOf(p) > -1 : false)})
            .append("text")
            .text(function(p) {return p.name})
            .style("text-anchor", "middle")
            .attr("y", 15)
            .attr("class", "sat")
            .style("fill", "none")
            .style("stroke", "white")
            .style("stroke-width", 3)
            .style("stroke-opacity", .7);

        d3.selectAll("g.sub-node")
            .filter(function(p) {return p == d || p == d.parent || (d.subChildren ? d.subChildren.indexOf(p) > -1 : false)})
            .append("text")
            .text(function(p) {return p.name})
            .style("text-anchor", "middle")
            .attr("y", 15)
            .attr("class", "sat");

        d3.select(this).select("circle").style("stroke", "black").style("stroke-width", 3);

    }

    function nodeClick(d)
    {
         console.log(d);
         makeViz(d.id);
    }


}

function treeConvert(mainId, data) {
    //Definition of Tree
    dataMainId = $.grep(data, function(e){ return e.id == mainId; });
    tree = dataMainId[0];

    //Definition of tree NAME
    tree = getName(tree);
    tree = getPreview(tree);

    //Definition of tree CHILDREN
    tree = getChildren(tree, data, null);

    for(treeChildrenId in tree.children) {
        if(tree.children[treeChildrenId].id != tree.id) {
            tree.children[treeChildrenId] = getName(tree.children[treeChildrenId]);
            tree.children[treeChildrenId] = getPreview(tree.children[treeChildrenId]);
            //tree.children[treeChildrenId] = getChildren(tree.children[treeChildrenId], data, tree.id);
        }
    }

    console.log(tree);
    return tree;
}

function getName(tree) {
<<<<<<< HEAD
    console.log(tree);
=======
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c
    if(tree.prefLabel) {
        tree.name = tree.prefLabel;
    } else if(tree.altLabel) {
        tree.name = tree.altLabel;
    } else if(tree.title) {
        tree.name = tree.title;
    } else {
        tree.name = "Untitled";
    }

    return tree;
}

function getPreview(tree) {
    if(!tree.preview) {
        tree.preview = "web/images/no-image.png";
    }

    return tree;
}

function getChildren(tree, data, parentId) {
    tree.children = [];
    if (tree.type === 'http://www.europeana.eu/schemas/edm/ProvidedCHO') {
        for (nodeCreatorId in tree.creator) {
            dataCreator = $.grep(data, function (e) {return e.id == tree.creator[nodeCreatorId];});
<<<<<<< HEAD
            if (dataCreator[0].id !== parentId) {
                dataCreator[0].link = 'createdBy';
                tree.children.push(dataCreator[0]);
            }
        }
        for (nodeSpatialId in tree.spatial) {
            dataSpatial = $.grep(data, function (e) {return e.id == tree.spatial[nodeSpatialId];});
            if(dataSpatial[0].id !== parentId) {
                dataSpatial[0].link = 'spatial';
                tree.children.push(dataSpatial[0]);
            }
=======
            if (dataCreator[0].id !== parentId) {tree.children.push(dataCreator[0]);}
        }
        for (nodeSpatialId in tree.spatial) {
            dataSpatial = $.grep(data, function (e) {return e.id == tree.spatial[nodeSpatialId];});
            if(dataSpatial[0].id !== parentId) {tree.children.push(dataSpatial[0]);}
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c
        }
    } else if (tree.type === 'http://www.europeana.eu/schemas/edm/Agent') {
        //Select other Agent for Agent (isRelatedTo)
        for (nodeRelatedId in tree.isRelatedTo) {
            dataRelated = $.grep(data, function (e) {return e.id == tree.isRelatedTo[nodeRelatedId];});
<<<<<<< HEAD
            if(dataRelated.length > 0 && dataRelated[0].id !== parentId){
                dataRelated[0].link = 'isRelatedTo';
                tree.children.push(dataRelated[0]);
            }
=======
            if(dataRelated.length > 0 && dataRelated[0].id !== parentId){tree.children.push(dataRelated[0]);}
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c
        }
        //Select CHO where creator is the ID
        dataCHO = $.grep(data, function (e) {return $.inArray(tree.id, e.creator) > -1;});
        if (dataCHO.length > 0) {
            for (dataCHOId in dataCHO) {
<<<<<<< HEAD
                if (dataCHO[dataCHOId].id !== parentId) {
                    dataCHO[dataCHOId].link = 'creator';
                    tree.children.push(dataCHO[dataCHOId]);
=======
                if (dataCHOId < 15) {
                    if (dataCHO[dataCHOId].id !== parentId) {
                        tree.children.push(dataCHO[dataCHOId]);
                    }
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c
                }
            }
        }
        //Select place of birth
        dataPlaceOfBirth = $.grep(data, function (e) {return e.id == tree.placeOfBirth;});
<<<<<<< HEAD
        if(dataPlaceOfBirth.length > 0 && dataPlaceOfBirth[0].id !== parentId){
            dataPlaceOfBirth[0].link = 'placeOfBirth';
            tree.children.push(dataPlaceOfBirth[0]);
        }
        //Select place of death
        dataPlaceOfDeath = $.grep(data, function (e) {return e.id == tree.placeOfDeath;});
        if(dataPlaceOfDeath.length > 0 && dataPlaceOfDeath[0].id !== parentId){
            dataPlaceOfDeath[0].link = 'placeOfDeath';
            tree.children.push(dataPlaceOfDeath[0]);
        }

        //Select Subject
        dataSubject = $.grep(data, function (e) {return e.subject == tree.id;});
        if (dataSubject.length > 0) {
            for (dataSubjectId in dataSubject) {
                if (dataSubject[dataSubjectId].id !== parentId) {
                    dataSubject[dataSubjectId].link = 'subjectOf'
                    tree.children.push(dataSubject[dataSubjectId]);
                }
            }
        }
        //Select Partner
        dataPartner = $.grep(data, function (e) {return e.partner == tree.id;});
        if (dataPartner.length > 0) {
            for (dataPartnerId in dataPartner) {
                if (dataPartner[dataPartnerId].id !== parentId) {
                    dataPartner[dataPartnerId].link = 'partnerOf';
                    tree.children.push(dataPartner[dataPartnerId]);
                }
            }
        }
        //Select studentOf
        dataStudentOf = $.grep(data, function (e) {return e.studentOf == tree.id;});
        if (dataStudentOf.length > 0) {
            for (dataStudentOfId in dataStudentOf) {
                if (dataStudentOf[dataStudentOfId].id !== parentId) {
                    dataStudentOf[dataStudentOfId].link = 'studentOf';
                    tree.children.push(dataStudentOf[dataStudentOfId]);
                }
            }
        }
        //Select HasStudent
        dataHasStudent = $.grep(data, function (e) {return e.hasStudent == tree.id;});
        if (dataHasStudent.length > 0) {
            for (dataHasStudentId in dataHasStudent) {
                if (dataHasStudent[dataHasStudentId].id !== parentId) {
                    tree.children.push(dataHasStudent[dataHasStudentId]);
                }
            }
        }
        //Select hasChilds
        dataHasChilds = $.grep(data, function (e) {return e.hasChilds == tree.id;});
        if (dataHasChilds.length > 0) {
            for (dataHasChildsId in dataHasChilds) {
                if (dataHasChilds[dataHasChildsId].id !== parentId) {
                    dataHasChilds[dataHasChildsId].link = 'parentOf'
                    tree.children.push(dataHasChilds[dataHasChildsId]);
                }
            }
        }
=======
        if(dataPlaceOfBirth.length > 0 && dataPlaceOfBirth[0].id !== parentId){tree.children.push(dataPlaceOfBirth[0]);}
        //Select place of death
        dataPlaceOfDeath = $.grep(data, function (e) {return e.id == tree.placeOfDeath;});
        if(dataPlaceOfDeath.length > 0 && dataPlaceOfDeath[0].id !== parentId){tree.children.push(dataPlaceOfDeath[0]);}
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c

    } else if (tree.type === 'http://www.europeana.eu/schemas/edm/Place') {
        //Select CHO where spatial is the ID
        dataCHO = $.grep(data, function (e) {return $.inArray(tree.id, e.spatial) > -1;});
        if (dataCHO.length > 0) {
            for (dataCHOId in dataCHO) {
<<<<<<< HEAD
                if (dataCHO[dataCHOId].id !== parentId) {
                    dataCHO[dataCHOId].link = 'spatial';
                    tree.children.push(dataCHO[dataCHOId]);
=======
                if (dataCHOId < 15) {
                    if (dataCHO[dataCHOId].id !== parentId) {
                        tree.children.push(dataCHO[dataCHOId]);
                    }
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c
                }
            }
        }
        //Select AGENT where placeOfBirth is the ID
        dataAgentBirth = $.grep(data, function (e) {return e.placeOfBirth == tree.id;});
        if (dataAgentBirth.length > 0) {
            for (dataAgentBirthId in dataAgentBirth) {
<<<<<<< HEAD
                if (dataAgentBirth[dataAgentBirthId].id !== parentId) {
                    dataAgentBirth[dataAgentBirthId].link = 'placeOfBirth';
                    tree.children.push(dataAgentBirth[dataAgentBirthId]);
=======
                if (dataAgentBirthId < 15) {
                    if (dataAgentBirth[dataAgentBirthId].id !== parentId) {
                        tree.children.push(dataAgentBirth[dataAgentBirthId]);
                    }
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c
                }
            }
        }
        //Select AGENT where placeOfDeath is the ID
        dataAgentDeath = $.grep(data, function (e) {return e.placeOfDeath == tree.id;});
        if (dataAgentDeath.length > 0) {
            for (dataAgentDeathId in dataAgentDeath) {
<<<<<<< HEAD
                if (dataAgentDeath[dataAgentDeathId].id !== parentId) {
                    dataAgentDeath[dataAgentDeathId].link = 'placeOfDeath';
                    tree.children.push(dataAgentDeath[dataAgentDeathId]);
=======
                if (dataAgentDeathId < 15) {
                    if (dataAgentDeath[dataAgentDeathId].id !== parentId) {
                        tree.children.push(dataAgentDeath[dataAgentDeathId]);
                    }
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c
                }
            }
        }
    }
<<<<<<< HEAD


    tree.children.sort(function() {return 0.5 - Math.random()});
    for(childNb in tree.children) {
        if(childNb > 30) {tree.children.splice(childNb);}
    }

    /*console.log(tree);*/

=======
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c
    return tree;
}