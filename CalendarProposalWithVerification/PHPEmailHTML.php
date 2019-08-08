<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
 
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Calendar Proposal Test Page</title>
    <link href="EmailVerifStyle.css" type="text/css" rel="stylesheet" />
</head>
<body>
    <!-- start header div -->
    <div id="header">
        <h3>Calendar Proposal Test Page</h3>
    </div>
    <!-- end header div -->  
     
    <!-- start wrap div -->  
    <div id="wrap">
         
        <!-- start php code -->
        <?php


        require("C:/Users/origa/Documents/PHPMailer-master/src/PHPMailer.php");
        require("C:/Users/origa/Documents/PHPMailer-master/src/SMTP.php");

        $connection = mysqli_connect('$hose','$user', '$pass', '$databasename') OR die (mysqli_connect_error());
        
        echo '<p>'.mysqli_real_escape_string($connection, "Antonio Diaz").'</p>';

        if(isset($_POST['name']) && !empty($_POST['name']) AND isset($_POST['email']) && !empty($_POST['email'])){
            $name = mysqli_real_escape_string($connection, ($_POST['name']));
            $email = mysqli_real_escape_string($connection, ($_POST['email']));
            $exploded_input = explode("@", $email);
            $exploded_input = $exploded_input[1];
            $email_cond_one = 'tamu.edu';
            $email_cond_two = 'jpl.nasa.gov';
            $select = mysqli_query($connection, "SELECT `email` FROM `users` WHERE `email` = '".$_POST['email']."'") or exit(mysqli_error($connection));

            function sendEmail($name, $email, $hash, $password){
                $mail = new PHPMailer\PHPMailer\PHPMailer();
                $mail->IsSMTP(); // enable SMTP
    
                $mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
                $mail->SMTPAuth = true; // authentication enabled
                $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
                $mail->Host = "smtp.gmail.com";
                $mail->Port = 465; // or 587
                $mail->SMTPDebug = 0; 
                $mail->IsHTML(true);
                $mail -> Username = $username;
                $mail -> Password = $pass;
                //no reply @ domain name used to host 
                $mail -> SetFrom('test@gmail.com');
                $mail -> Subject = 'Signup | Verification';
                $mail -> Body = '
                    <h3>Thanks for signing up!</h3>
                    </br>
                    <h4>Your account has been created.</h4>
                    </br> 
                    Link to activate your account:
                    http://www.yourwebsite.com/verify.php?email='.$email.'&hash='.$hash.'   
                    <br>
                    <h4>Credentials after you have activated your account by pressing the url:<h4>
                    </br>
                    <p>------------------------</p>
                    <p>Username: '.$name.'</p>
                    <p>Password: '.$password.'</p>
                    <p>------------------------</p>  
                                ';
                $mail -> AddAddress($email);
    
                if(!$mail->Send()) {
                    $msg = "Mailer Error: " . $mail->ErrorInfo;
                } else {
                    $msg = "Message has been sent";
                }
            }

            if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                // Return Error - Invalid Email
                $msg = 'The email you have entered is invalid, please try again.';
            }elseif(mysqli_num_rows($select)){
                $msg = '<p id ="email_cond_false">This email is already being used</p>';
            }
            else{
                    if (($exploded_input == $email_cond_one) || ($exploded_input == $email_cond_two)){
                        $msg = 'Your account is being made, <br /> please verify it by clicking the activation link that has been send to your email.';
                        $hash = md5( rand(0,1000) );
                        $password = rand(1000,5000);
            
                        $query    = "INSERT INTO users (username, password, email, hash)
                        VALUES (
                            '". ($name) ."', 
                            '". (md5($password)) ."', 
                            '". ($email) ."', 
                            '". ($hash) ."') " or die(mysqli_connect_error()); 
                        mysqli_query($connection, $query); 
                        sendEmail($name, $email, $hash, $password);
                    }
                    else{
                        $msg = '<p id ="email_cond_false">Cannot make account with that email.</p>';
                    }
                }
        }
                
        ?>
        <!-- stop php code -->
     
        <!-- title and description -->   
        <h3>Signup Form</h3>
        <p>Please enter your name and email addres to create your account</p>
         
        <?php 
        if(isset($msg)){  // Check if $msg is not empty
            echo '<div class="statusmsg">'.$msg.'</div>'; // Display our message and wrap it with a div with the class "statusmsg".
        } 
        ?>
        <!-- start sign up form -->  
        <form action="" method="post">
            <label for="name">Name:</label>
            <input type="text" name="name" value="" spellcheck="false"/>
            <label for="email">Email:</label>
            <input type="text" name="email" value="" spellcheck="false"/>
             
            <input type="submit" class="submit_button" value="Sign up" />
        </form>
        <!-- end sign up form -->
         
    </div>
    <!-- end wrap div -->
</body>
</html>
