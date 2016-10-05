<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Europeana Hackweek Entities</title>
    
        <link rel="icon" type="image/x-icon" href="web/favicon.ico" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
        <link rel="stylesheet" href="web/css/main.css">
        <link rel="stylesheet" href="web/css/autocomplete.css">
    </head>
<<<<<<< HEAD
    <body onload="makeViz('http://data.europeana.eu/item/90402/SK_A_91')">
=======
    <body onload="makeViz('http://www.wikidata.org/entity/Q543648')">
>>>>>>> cb11b0fbb7667e315d320a52e2b53684d72db86c
        <header>
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">
                            <img src="web/images/europeana-logo.png" alt="Clichés! logo" style="max-height:70px; margin-top: -25px; display: inline;" />
                        </a> <span class="navbar-brand" style="margin-left: 0px; font-size: 2em;">Hackweek Entities</span>
                    </div>
        
                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <form class="navbar-form navbar-right" role="search">
                            <div class="form-group">
                                <input id="uri-input" type="text" class="form-control" placeholder="Search" size="55">
                            </div>
                        </form>
                    </div><!-- /.navbar-collapse -->
                </div><!-- /.container-fluid -->
            </nav>
        </header>
        
        <div class="container-fluid" style="height: 100%;">
            <?php include 'body.php'; ?>
        </div>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
        <script src="web/js/autocomplete.js"></script>
        <script src="web/js/autocompleteRender.js"></script>
        <script src="web/js/card-template.js"></script>
        <script src="web/js/orbit.js"></script>
        <script src="web/js/d3.layout.orbit.js" charset="utf-8" type="text/javascript"></script>
    </body>
</html>
