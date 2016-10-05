d3.layout.orbit = function() {
    var currentTickStep = 0;
    var orbitNodes;
    var orbitSubNodes;
    var orbitSize = [1,1];
    var nestedNodes;
    var nestedSubNodes;
    var flattenedNodes = [];
    var flattenedSubNodes = [];
    var tickRadianStep = 0.004363323129985824;
    var orbitDispatch = d3.dispatch('tick');
    var tickInterval;
    var orbitDepthAdjust = function() {return 2.95};
    var childrenAccessor = function(d) {return d.children};
    var subChildrenAccessor = function(d) {return d.subChildren};
    var tickRadianFunction = function() {return 1};
    var fixedOrbitArray = [99];
    var orbitMode = "flat";


    function _orbitLayout() {

        return _orbitLayout;
    }

    _orbitLayout.mode = function(_mode) {
        //Atomic, Solar, other?
        if (!arguments.length) return orbitMode;

        if (_mode == "solar") {
            fixedOrbitArray = [1]
        }
        if (_mode == "atomic") {
            fixedOrbitArray = [2,8]
        }
        if (_mode == "flat") {
            fixedOrbitArray = [99]
        }
        orbitMode = _mode;
        if (Array.isArray(_mode)) {
            fixedOrbitArray = _mode;
            orbitMode = "custom";
        }
        return this
    }

    _orbitLayout.start = function() {
        //activate animation here
        tickInterval = setInterval(
            function() {
                //currentTickStep++; -> activate rotation
                flattenedNodes.forEach(function(_node){
                    if (_node.parent) {
<<<<<<< HEAD
                        _node.x = _node.parent.x + ( (_node.ring-230) * Math.sin( _node.angle + (currentTickStep * tickRadianStep * tickRadianFunction(_node))) );
                        _node.y = _node.parent.y + ( (_node.ring-230) * Math.cos( _node.angle + (currentTickStep * tickRadianStep * tickRadianFunction(_node))) );
=======
                        _node.x = _node.parent.x + ( (_node.ring-250) * Math.sin( _node.angle + (currentTickStep * tickRadianStep * tickRadianFunction(_node))) );
                        _node.y = _node.parent.y + ( (_node.ring-250) * Math.cos( _node.angle + (currentTickStep * tickRadianStep * tickRadianFunction(_node))) );
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c
                    }
                })
                flattenedSubNodes.forEach(function(_node){
                    if (_node.parent) {
                        _node.x = _node.parent.x + ( (_node.ring-110) * Math.sin( _node.angle + (currentTickStep * tickRadianStep * tickRadianFunction(_node))) );
                        _node.y = _node.parent.y + ( (_node.ring-110) * Math.cos( _node.angle + (currentTickStep * tickRadianStep * tickRadianFunction(_node))) );
                    }
                })
                orbitDispatch.tick();
            },
            10);
    }

    _orbitLayout.stop = function() {
        //deactivate animation here
        clearInterval(tickInterval);
    }

    _orbitLayout.speed = function(_degrees) {
        if (!arguments.length) return tickRadianStep / (Math.PI / 360);
        tickRadianStep = tickRadianStep = _degrees * (Math.PI / 360);
        return this;
    }

    _orbitLayout.size = function(_value) {
        if (!arguments.length) return orbitSize;
        orbitSize = _value;
        return this;
        //change size here
    }

    _orbitLayout.revolution = function(_function) {
        //change ring size reduction (make that into dynamic function)
        if (!arguments.length) return tickRadianFunction;
        tickRadianFunction = _function;
        return this
    }

    _orbitLayout.orbitSize = function(_function) {
        //change ring size reduction (make that into dynamic function)
        if (!arguments.length) return orbitDepthAdjust;
        orbitDepthAdjust = _function;
        return this
    }

    _orbitLayout.nodes = function(_data) {
        if (!arguments.length) return flattenedNodes;
        nestedNodes = _data;
        calculateNodes();
        return this;
    }

    _orbitLayout.subNodes = function(_data) {
        if (!arguments.length) return flattenedSubNodes;
        nestedSubNodes = _data;
        calculateSubNodes();
        return this;
    }

    _orbitLayout.children = function(_function) {
        if (!arguments.length) return childrenAccessor;

        //Probably should use d3.functor to turn a string into an object key
        childrenAccessor = _function;
        return this;


    }

    _orbitLayout.subChildren = function(_function) {
        if (!arguments.length) return subChildrenAccessor;

        //Probably should use d3.functor to turn a string into an object key
        subChildrenAccessor = _function;
        return this;


    }

    d3.rebind(_orbitLayout, orbitDispatch, "on");

    return _orbitLayout;
    function calculateNodes() {
        orbitNodes = nestedNodes;

        orbitNodes.x = orbitSize[0] / 2;
        orbitNodes.y = orbitSize[1] / 2;
        orbitNodes.ring = orbitSize[0] / 2.1; //HERE for the length between central point and items
        orbitNodes.depth = 0;

        flattenedNodes.push(orbitNodes);

        traverseNestedData(orbitNodes);

        function traverseNestedData(_node) {

            if(childrenAccessor(_node)) {
                var y = 0;
                var totalChildren = childrenAccessor(_node).length;
                var _rings = 0;
                var _total_positions = 0;
                var _p = 0;
                while (_total_positions < totalChildren) {
                    if (fixedOrbitArray[_p]) {
                        _total_positions += fixedOrbitArray[_p];
                    }
                    else {
                        _total_positions += fixedOrbitArray[fixedOrbitArray.length - 1];
                    }
                    _p++;
                    _rings++;
                }

                while (y < totalChildren) {
                    var _pos = 0;
                    var _currentRing = 0;
                    var _p = 0;
                    var _total_positions = 0;

                    while (_total_positions <= y) {
                        if (fixedOrbitArray[_p]) {
                            _total_positions += fixedOrbitArray[_p];
                        }
                        else {
                            _total_positions += fixedOrbitArray[fixedOrbitArray.length-1];
                        }

                        _p++;
                        _currentRing++;
                    }

                    var ringSize = fixedOrbitArray[fixedOrbitArray.length-1];

                    if (fixedOrbitArray[_currentRing-1]) {
                        ringSize = fixedOrbitArray[_currentRing-1];
                    }

                    if (_node.parent) {
                        var _ring = {source: _node, x: _node.x, y: _node.y, r: _node.parent.ring / orbitDepthAdjust(_node) * (_currentRing / _rings)};
                    }
                    else {
                        var _ring = {source: _node, x: _node.x, y: _node.y, r: (orbitSize[0] / 2) * (_currentRing / _rings)};
                    }


                    var thisPie = d3.layout.pie().value(function(d) {return childrenAccessor(d) ? 4 : 1});
                    var piedValues = thisPie(childrenAccessor(_node).filter(function(d,i) {return i >= y && i <= y+ringSize-1}));

                    for (var x = y; x<y+ringSize && x<totalChildren;x++) {
                        childrenAccessor(_node)[x].angle = ((piedValues[x - y].endAngle - piedValues[x - y].startAngle) / 2) + piedValues[x - y].startAngle;

                        childrenAccessor(_node)[x].parent = _node;
                        childrenAccessor(_node)[x].depth = _node.depth + 1;

                        childrenAccessor(_node)[x].x = childrenAccessor(_node)[x].parent.x + ( (childrenAccessor(_node)[x].parent.ring / 2) * Math.sin( childrenAccessor(_node)[x].angle ) );
                        childrenAccessor(_node)[x].y = childrenAccessor(_node)[x].parent.y + ( (childrenAccessor(_node)[x].parent.ring / 2) * Math.cos( childrenAccessor(_node)[x].angle ) );

                        childrenAccessor(_node)[x].ring = _ring.r;

                        flattenedNodes.push(childrenAccessor(_node)[x]);
                        traverseNestedData(childrenAccessor(_node)[x]);
                    }
                    y+=ringSize;
                }

            }
        }

    }

    function calculateSubNodes() {
        orbitSubNodes = nestedSubNodes;

        orbitSubNodes.x = orbitSize[0] / 2;
        orbitSubNodes.y = orbitSize[1] / 2;
        orbitSubNodes.ring = orbitSize[0] / 1.3; //HERE for the length between central point and items
        orbitSubNodes.depth = 0;

        flattenedSubNodes.push(orbitSubNodes);

        traverseNestedSubData(orbitSubNodes);

        function traverseNestedSubData(_node) {

            if(subChildrenAccessor(_node)) {
                var y = 0;
                var totalSubChildren = subChildrenAccessor(_node).length;
                var _rings = 0;
                var _total_positions = 0;
                var _p = 0;
                while (_total_positions < totalSubChildren) {
                    if (fixedOrbitArray[_p]) {
                        _total_positions += fixedOrbitArray[_p];
                    }
                    else {
                        _total_positions += fixedOrbitArray[fixedOrbitArray.length - 1];
                    }
                    _p++;
                    _rings++;
                }

                while (y < totalSubChildren) {
                    var _pos = 0;
                    var _currentRing = 0;
                    var _p = 0;
                    var _total_positions = 0;

                    while (_total_positions <= y) {
                        if (fixedOrbitArray[_p]) {
                            _total_positions += fixedOrbitArray[_p];
                        }
                        else {
                            _total_positions += fixedOrbitArray[fixedOrbitArray.length-1];
                        }

                        _p++;
                        _currentRing++;
                    }

                    var ringSize = fixedOrbitArray[fixedOrbitArray.length-1];

                    if (fixedOrbitArray[_currentRing-1]) {
                        ringSize = fixedOrbitArray[_currentRing-1];
                    }

                    if (_node.parent) {
                        var _ring = {source: _node, x: _node.x, y: _node.y, r: _node.parent.ring / orbitDepthAdjust(_node) * (_currentRing / _rings)};
                    }
                    else {
                        var _ring = {source: _node, x: _node.x, y: _node.y, r: (orbitSize[0] / 2) * (_currentRing / _rings)};
                    }


                    var thisPie = d3.layout.pie().value(function(d) {return subChildrenAccessor(d) ? 4 : 1});
                    var piedValues = thisPie(subChildrenAccessor(_node).filter(function(d,i) {return i >= y && i <= y+ringSize-1}));

                    for (var x = y; x<y+ringSize && x<totalSubChildren;x++) {
                        subChildrenAccessor(_node)[x].angle = ((piedValues[x - y].endAngle - piedValues[x - y].startAngle) / 2) + piedValues[x - y].startAngle;

                        //console.log(_node);
                        subChildrenAccessor(_node)[x].parent = _node;
                        subChildrenAccessor(_node)[x].depth = _node.depth + 1;

                        subChildrenAccessor(_node)[x].x = subChildrenAccessor(_node)[x].parent.x + ( (subChildrenAccessor(_node)[x].parent.ring / 2) * Math.sin( subChildrenAccessor(_node)[x].angle ) );
                        subChildrenAccessor(_node)[x].y = subChildrenAccessor(_node)[x].parent.y + ( (subChildrenAccessor(_node)[x].parent.ring / 2) * Math.cos( subChildrenAccessor(_node)[x].angle ) );

                        subChildrenAccessor(_node)[x].ring = _ring.r;

                        flattenedSubNodes.push(subChildrenAccessor(_node)[x]);
                        traverseNestedSubData(subChildrenAccessor(_node)[x]);

                        //Links creation for subnode :
                        subChildrenAccessor(_node)[x].links = [];
                        console.log(_node);
                        for(var xl in _node.links) {
                            //console.log(_node.links[xl]);

                            if(_node.links[xl].subChildren == subChildrenAccessor(_node)[x].name) {
                                subChildrenAccessor(_node)[x].links.push(_node.links[xl].children);
                            }
                        }

                        
                        delete subChildrenAccessor(_node)[x].parent;
                        //console.log(subChildrenAccessor(_node)[x]);

                    }
                    y+=ringSize;
                }

            }
        }

    }

}
