import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { useLocation } from 'react-router-dom'; // Import useLocation hook from react-router-dom
import 'jquery-ui/ui/widgets/dialog'; // Ensure you have this widget installed
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Data.css';

function Data() {
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation(); // Hook to access the location object

    useEffect(() => {
        // Function to adjust dialog position
        const adjustDialogPosition = () => {
            $("#data-dialog").dialog("option", "position", {
                my: "center",
                at: "center",
                of: window
            });
        };

        // Initialize the dialog with your options
        $("#data-dialog").dialog({
            autoOpen: false,
            modal: true,
            title: 'Data',
            width: '80%', // Adjust width to be less than 100% to create side margins
            maxWidth: '600px', // Set maximum width if needed
            create: function() {
                var titleBar = $(this).closest('.ui-dialog').find('.ui-dialog-titlebar');
                titleBar.find('.ui-dialog-titlebar-close').html('<span class="ui-button-icon ui-icon ui-icon-closethick"></span>');
                titleBar.find('.ui-dialog-title').css({
                    'float': 'none',
                    'color': '#000' // Ensure the color contrasts with the background
                });
            },
            open: function() {
                $('.ui-widget-overlay').addClass('custom-overlay');
                adjustDialogPosition(); // Adjust position when the dialog opens
            }
        });

        // Add a resize listener to the window
        $(window).resize(adjustDialogPosition);

        // Cleanup function
        return () => {
            $(window).off("resize", adjustDialogPosition);
            // Close the dialog if it's open
            $("#data-dialog").dialog("destroy");
        };
    }, []);




    useEffect(() => {
        // Close the dialog if the route changes
        const closeDialog = () => {
            if ($("#data-dialog").is(":ui-dialog")) {
                $("#data-dialog").dialog("close");
            }
        };

        // Listen for route changes
        closeDialog();

        return () => {
            // Cleanup listener
            closeDialog();
        };
    }, [location]);


    const fetchData = () => {
        setIsLoading(true);
        $.ajax({
            url: 'http://localhost:8080/api/data',
            method: 'GET',
            success: function(response) {
                // Assuming the response is just the date string from the API
                // Update this line to match the structure of your API response if different
                const apiDate = response;

                $("#current-date").text(`API Date: ${apiDate}`);
                setIsLoading(false);
                $("#data-dialog").dialog("open");
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data', xhr.responseText);
                setIsLoading(false);
            }
        });
    };

    return (
        <div className="data-container">
            {location.pathname === '/data' && ( // Render only when the pathname is '/data'
                <>
                    <button className="update-button btn btn-danger my-2" onClick={fetchData}>
                        {isLoading ? 'Loading...' : 'Click to Update Data'}
                    </button>
                    <div id="data-dialog" title="Fetched Data">
                        <div id="current-date">Current Date: </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Data;
