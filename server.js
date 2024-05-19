const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Serve index.html file
        fs.readFile(path.join(__dirname, 'indexdd.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/submit') {
        // Handle form submission
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            const formData = qs.parse(body);
            // Log the form d  ata
            console.log('Form Data:', formData);

            const phone = formData.phone; // Assuming 'name' corresponds to the phone number field
            const message = formData.msg; // Assuming 'email' corresponds to the message field
            
            // Log the form data
            console.log('Phone:', phone);
            console.log('Message:', message);

            //call the sms method here

            //figure out how that works from another file.. but here is my own

            send_sms(phone,message);

            // Send a response
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Form submitted successfully');
        });
    } else {
        // Handle other routes
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


function send_sms(phone, msg){
   
    var numbers = [phone];
    var message = msg;
    
        const credentials = {
            apiKey: '73e4ce961ea7760a07a43a7730e0618a412dbaaf839ddae215d33d2e90a2b288',
            username: 'testout'
        };
        const AfricasTalking = require('africastalking')(credentials);
    
        const sms = AfricasTalking.SMS;
    
        const options = {
            to: numbers, 
            message: message
        }
    
        sms.send(options)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        }