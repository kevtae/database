<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <body>
        <h2>My CDs</h2>
        <?php
            if(!@mysql_connect("134.74.112.21", "utest", "utest")) {
                echo "<h2>Connection Error.</h2>";
                die();
            }
            mysql_select_db("Taehun-Lim");
        ?>
        <table border="0" cellpadding="0" cellspacing="0">
            <tr bgcolor="#f87820">
                <td class=tabhead><img src="img/blank.gif" alt="" width="200" height="6"><br><b>Artist</b></td>
                <td class=tabhead><img src="img/blank.gif" alt="" width="200" height="6"><br><b>Title</b></td>
                <td class=tabhead><img src="img/blank.gif" alt="" width="50" height="6"><br><b>Year</b></td>
                <td class=tabhead><img src="img/blank.gif" alt="" width="50" height="6"><br><b>Command</b></td>
                <td><img src="img/blank.gif" alt="" width="10" height="25"></td>
            </tr>
            <?php
            	error_reporting(E_ALL ^ E_NOTICE);
                if ($_REQUEST['artist'] != "") {
                    if ($_REQUEST['year'] == "") {
                        $year = "NULL";
                    } else {
                        $year = intval($_REQUEST['year']);
                    }
                    $title = mysql_real_escape_string($_REQUEST['title']);
                    $artist = mysql_real_escape_string($_REQUEST['artist']);
                    mysql_query("INSERT INTO cds (title,artist,year) VALUES('$title','$artist',$year)");
                    echo "INSERT INTO cds (title,artist,year) VALUES('$title','$artist',$year)";
                }

                if ($_REQUEST['action'] == "del") {
                    $id = intval($_REQUEST['id']);
                    mysql_query("DELETE FROM cds WHERE id=$id");
                }

                $result = mysql_query("SELECT id,title,artist,year FROM cds ORDER BY artist");
                $i = 0;
                while ($row = mysql_fetch_array($result)) {
                    echo "<tr valign='middle'>";
                    echo "<td>".$row['artist']."</td>";
	                echo "<td>".$row['title']."</td>";
                    echo "<td>".$row['year']."</td>";
                    echo "<td><a onclick=\"return confirm('Are you sure?');\" href='cds_demo.php?action=del&amp;id=".$row['id']."'><span class='red'>Delete</span></a></td>";
                    echo "</td>";
                    echo "</tr>";
                    $i++;
                }
            ?>
        </table>

        <h2>Add CD</h2>

        <form action="<?php echo basename($_SERVER['PHP_SELF']); ?>" method="get">
            <table border="0" cellpadding="0" cellspacing="0">
                <tr><td>Artist:</td><td><input type="text" size="30" name="artist"></td></tr>
                <tr><td>Title</td><td> <input type="text" size="30" name="title"></td></tr>
                <tr><td>Year:</td><td> <input type=text size="5" name="year"></td></tr>
                <tr><td>&nbsp;</td><td><input type="submit" value="Add CD"></td></tr>
            </table>
        </form>
    </body>
</html>
