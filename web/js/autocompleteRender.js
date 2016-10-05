/**
 * Created by karlpineau on 23/06/2016.
 */
AutoComplete({
    EmptyMessage: "No item found",
    Url: "autocomplete.php",
    QueryArg: "query_search",
    Limit: 10,
    _Select: function(item) {
        if (item.hasAttribute("data-autocomplete-value")) {
            this.Input.value = item.getAttribute("data-autocomplete-value");
        } else {
            this.Input.value = item.innerHTML;
        }
        this.Input.setAttribute("data-autocomplete-old-value", this.Input.value);

        console.log(item.childNodes[0]);
        makeViz($('#uri-input').val());
        $('#uri-input').val(item.childNodes[0].data);
    },
}, "#uri-input");