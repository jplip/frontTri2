---
layout: page
title: Profile
permalink: /profile/
---

### Profile

<form action="upload.php" method="post">
    <input type="file" name="file" id="file"/>
</form>

<?php
    $pathToImage = "/new/file/path/unique/345908.png";
    move_uploaded_files($_FILES['file']['tmp_name'], $pathToImage);
?>

<?php
    mysql_query('UPDATE users SET profile_image = ".$pathToImage." WHERE username="matt"');
?>