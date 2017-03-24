// Config
const config = {};
config.akPage = 'call-out-gorsuch-www';
config.callCampaign = 'call-out-gorsuch';
config.link = 'https://calloutgorsuch.com/';
config.prettyCampaignName = "Oppose Trump's takeover of the Supreme Court";

// Modules
const React = require('react');
const ReactDOM = require('react-dom');

// Checking for outdated browsers
(() => {
    const isIE = navigator.userAgent.match(/MSIE (\d+)\./);
    if (isIE) {
        const version = +isIE[1];
        if (version < 10) {
            alert('Unfortunately your browser, Internet Explorer ' + version + ', is not supported.\nPlease visit the site with a modern browser like Firefox or Chrome.\nThanks!');
        }
    }

    if (/Android 2\.3/.test(navigator.userAgent)) {
        alert('Unfortunately your browser, Android 2.3, is not supported.\nPlease visit the site with a modern browser like Firefox or Chrome.\nThanks!');
    }
})();

// Email
let emailHref = "";
try {
    // These HTML elements are optional
    const emailSubject = encodeURIComponent(document.querySelector('#email-share-subject').textContent.trim());
    const emailBody = encodeURIComponent(document.querySelector('#email-share-body').textContent.trim());
    emailHref = `mailto:?subject=${emailSubject}&body=${emailBody}`;
} catch (err) { }

// URLs
const urls = {};
urls.facebook = 'https://www.facebook.com/sharer.php?u=';
urls.feedback = 'https://dp-feedback-tool.herokuapp.com/api/v1/feedback?';
urls.twitter = 'https://twitter.com/intent/tweet?text=';


// State
const state = {};
state.count = 0;
state.isMobile = /mobile/i.test(navigator.userAgent);
state.isIE = /trident/i.test(navigator.userAgent);
state.query = getQueryVariables();

// Setup shortcuts for AJAX.
const ajax = {
    get: function(url, callback) {
        callback = callback || function() {};

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && callback) {
                callback(xhr.response);
            }
        };
        xhr.open('get', url, true);
        xhr.send();
    },

    post: function(url, formData, callback) {
        callback = callback || function() {};

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && callback) {
                callback(xhr.response);
            }
        };
        xhr.open('post', url, true);
        xhr.send(formData);
    },
};

const events = {
    list: {},
    on: function(event, callback) {
        if (!this.list[event]) {
            this.list[event] = [];
        }

        this.list[event].push(callback);
    },
    trigger: function(event, data) {
        if (!this.list[event]) {
            return;
        }

        for (let i = 0; i < this.list[event].length; i++) {
            this.list[event][i](data);
        }
    },
};

function getQueryVariables() {
    const variables = {};

    const queryString = location.search.substr(1);
    const pairs = queryString.split('&');

    for (let i = 0; i < pairs.length; i++) {
        const keyValue = pairs[i].split('=');
        variables[keyValue[0]] = keyValue[1];
    }

    return variables;
}

function getSource() {
    const source = state.query.source || 'website';
    return source.toLowerCase();
}

function findPos(obj) {
    let curTop = 0;
    if (obj.offsetParent) {
        do {
            curTop += obj.offsetTop;
        } while (obj = obj.offsetParent);

        return [curTop];
    }
}

function k() {}

const Header = () => (
    <header>
        <div className="title">
            <h4>Tell the Senate</h4>
            <h1>Oppose Trump&#039;s takeover of the Supreme Court</h1>
        </div>
    </header>
);

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const PhoneForm = React.createClass({
    render: function() {
        return (
            <div className="wrapper">


                <div className="top-cta">
                    <p>The Senate will be voting on Gorsuch soon -- we need you to <strong>call your senators now and tell them to vote no</strong>.</p>
                    <form onSubmit={ (e) => { this.onSubmit(e, 1); }} className="phone-form">
                        <input placeholder="Your Phone Number" id="field-phone-1" ref="field-phone-1" className="phone" name="phone" autoComplete="on" pattern="[\d\(\)\-\+ ]*" autoFocus />
                        <button className="blue-cta">
                            <img src="images/phone.svg" />
                            Call the Senate
                        </button>
                    </form>

                    <div className="privacy">
                        Or dial <a href="tel:+2023350864">(202) 335-0864</a> to connect.
                        <br />
                        This tool uses <a href="https://www.twilio.com/legal/privacy" target="_blank">Twilio</a>’s APIs.
                    </div>
                </div>

                <div className="copy">
                    <h2>YOU CAN SAVE THE SUPREME COURT</h2>

                    <p>Neil Gorsuch is Donald Trump&#039;s Supreme Court nominee -- <strong>and he is even more conservative than Antonin Scalia was.</strong>&nbsp;
                    Republicans are trying to ram through his confirmation -- and several Democrats are considering caving and joining them.</p>

                    <p><strong>Gorsuch has a long history of siding with powerful interests over everyday Americans.</strong>  And as Trump launches rhetorical attacks on the judiciary, tries to accumulate ever more power for himself and big business interests, and seeks to undermine civil rights and social justice, <strong>we simply cannot afford to let the Court shift to the far right.</strong> </p>
                    <h2>DON’T WORRY: CALLING IS <span>EASY</span></h2>
                    <p>The Senate <strong>must block and resist</strong> Trump&#039;s Supreme Court: We’ll connect you with your senators and key party leaders, and <strong>give you a script of what you can say</strong>.</p>
                </div>
                <div className="bottom-cta">
                    <form className="phone-form" onSubmit={ (e) => { this.onSubmit(e, 2); }}>
                        <input placeholder="Your Phone Number" id="field-phone-2" ref="field-phone-2" className="phone" name="phone" autoComplete="on" pattern="[\d\(\)\-\+ ]*" />
                        <button className="blue-cta">
                            <img src="images/phone.svg" />
                            Call the Senate
                        </button>
                    </form>
                </div>
                <div className="copy">
                    <p>Just enter your number and click “call”.  <strong>You’ll be done within 2 minutes</strong> and will have made serious progress in defending the Supreme Court from powerful interests.</p>
                </div>
            </div>
        );
    },

    onSubmit: function(e, fieldNum) {
        e.preventDefault();

        const phoneField = this.refs['field-phone-' + fieldNum];
        const number = phoneField.value.replace(/[^\d]/g, '');

        if (number.length !== 10) {
            phoneField.focus();
            return alert('Please enter your 10 digit phone number.');
        }

        const request = new XMLHttpRequest();
        let url = `https://dp-call-congress.herokuapp.com/create?db=cwd&campaignId=${config.callCampaign}&userPhone=${number}&source_id=${getSource()}`;

        try {
            if ('zip' in sessionStorage) {
                url += `&zipcode=${sessionStorage.zip}`;
            }
        } catch (err) {
            // Oh well
        }

        request.open('GET', url, true);
        request.send();

        this.props.changeForm('script');
    },
});

const PhoneScript = React.createClass({
    onClickSendFeedback: function(e) {
        e.preventDefault();

        const data = {
            campaign: config.callCampaign,
            subject: 'Feedback from ' + (config.prettyCampaignName || config.callCampaign),
            text: '',
        };

        const fields = [
            document.querySelector('#who'),
            document.querySelector('#how'),
        ];

        fields.forEach(field => {
            data.text += `${field.name}:\n${field.value}\n\n`;
        });

        let url = urls.feedback;

        for (let key in data) {
            url += key;
            url += '=';
            url += encodeURIComponent(data[key]);
            url += '&';
        }

        ajax.get(url);

        this.setState({
            sent: true,
        });
    },

    getInitialState: function() {
        return {
            sent: false,
        };
    },

    render: function() {
        return (
            <div className="phone-script">
                <em>We’re calling you and will connect you to your senators. <br/> If you stay on the line we will keep connecting you to other key senators.</em>
                <div className="spacer" />
                <em>After each conversation, you can <strong>press *</strong> and we’ll connect you to the next office.</em>
                <div className="spacer" />
                <em>Here’s what you can say: </em>
                <div className="spacer" />

                <div className="suggestion">
                    <p>&ldquo;<strong>Neil Gorsuch has consistently stood with corporations and other powerful interests against everyday Americans.</strong></p>
                    <div className="spacer" />
                    <p>Trump has launched rhetorical attacks on judges, is trying to accumulate ever more power for himself and big business interests,
                    and seeks to undermine civil rights and social justice. <strong>Neil Gorsuch will make it even easier for Trump to implement this agenda.</strong></p>
                    <div className="spacer" />
                    <p>Please vote against confirming Gorsuch.&quot;</p>
                </div>
                <div className="spacer" />

                <div className="calling-wrapper">
                    <h3>After your call(s), use the form to let us know how it went!</h3>
                    <form action="#" method="get" className={this.state.sent ? 'sent' : false}>
                        <div className="wrapper">
                            <h4>Who did you speak with?</h4>
                            <input required="required" type="text" name="Who did you speak with?" id="who" />
                            <h4>How did it go?</h4>
                            <input required="required" type="text" name="How did it go?" id="how" />
                            <br />
                            <div id="thanks">Thank you!</div>
                            <button onClick={this.onClickSendFeedback} type="submit" name="submit">Send Feedback</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    },
});

const Thanks = React.createClass({
    render: function() {
        return (
            <div className="thanks">
                Thanks for making your voice heard!
            </div>
        );
    },
});

const DemoPhoneForm = React.createClass({
    render: function() {
        return (
            <div className="stop-sessions-wrapper">
                <div className="phone-form-wrapper stop-sessions block-mnuchin">
                    <div className="paragraph">
                        <strong>Tell the Senate: Lorem ipsum!</strong>
                        <br />
                        <br />
                        Enter your phone number to be connected with the Senate.
                    </div>

                    <div className="phone-form" id="phone-form">
                        <form onSubmit={ this.onSubmit }>
                            <input placeholder="Your Phone Number" id="field-phone" ref="field-phone" className="phone" name="phone" autoComplete="on" pattern="[\d\(\)\-\+ ]*" autoFocus />
                            <button>
                                CALL THE SENATE
                                <img src="images/phone.svg" />
                            </button>
                        </form>

                        <div className="privacy">
                            This tool uses <a href="https://www.twilio.com/legal/privacy" target="_blank">Twilio</a>’s APIs.
                        </div>
                    </div>
                </div>

                <div className="paragraph" >
                    <hr />
                    <h3>Why do we need to lorem ipsum?</h3>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                    <br />
                    <br />
                    <ul>
                        <li><strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</strong> Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</li>
                        <li><strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</strong> Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</li>
                        <li><strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</strong> Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</li>
                    </ul>
                </div>

                <a href="#phone-form" className="call-the-senate">CALL THE SENATE<img src="images/phone.svg" /></a>

            </div>
        );
    },

    onSubmit: function(e) {
        e.preventDefault();

        const callCampaign = 'lorem-ipsum';

        const phoneField = this.refs['field-phone'];
        const number = phoneField.value.replace(/[^\d]/g, '');

        if (number.length !== 10) {
            phoneField.focus();
            return alert('Please enter your 10 digit phone number.');
        }

        const request = new XMLHttpRequest();
        let url = `https://dp-call-congress.herokuapp.com/create?db=cwd&campaignId=${callCampaign}&userPhone=${number}&source_id=${getSource()}`;

        try {
            if ('zip' in sessionStorage) {
                url += `&zipcode=${sessionStorage.zip}`;
            }
        } catch (err) {
            // Zip is optional.
        }

        request.open('GET', url, true);
        request.send();

        this.props.changeForm('demoscript');
    },
});

const DemoPhoneScript = React.createClass({
    onClickSendFeedback: function(e) {
        e.preventDefault();

        const data = {
            campaign: 'lorem-ipsum',
            subject: 'Feedback from Lorem Ipsum',
            text: '',
        };

        const fields = [
            document.querySelector('#who'),
            document.querySelector('#how'),
        ];

        fields.forEach(field => {
            data.text += `${field.name}:\n${field.value}\n\n`;
        });

        let url = urls.feedback;

        for (let key in data) {
            url += key;
            url += '=';
            url += encodeURIComponent(data[key]);
            url += '&';
        }

        ajax.get(url);

        this.setState({
            sent: true,
        });
    },

    getInitialState: function() {
        return {
            sent: false,
        };
    },

    render: function() {
        return (
            <div className="phone-script">
                <em>We’re calling you now. <br /> After the conversation, you can <strong>press *</strong> and we’ll connect you to the next office.</em>
                <div className="spacer" />

                <em>Here’s what you can say:</em>
                <div className="spacer" />

                <div className="suggestion">
                    "Lorem to the ipsum"
                </div>
                <div className="spacer" />

                <div className="calling-wrapper">
                    <h3>After your call(s), use the form to let us know how it went!</h3>
                    <form action="#" method="get" className={this.state.sent ? 'sent' : false}>
                        <div className="wrapper">
                            <h4>Who did you speak with?</h4>
                            <input required="required" type="text" name="Who did you speak with?" id="who" />
                            <h4>How did it go?</h4>
                            <input required="required" type="text" name="How did it go?" id="how" />
                            <br />
                            <div id="thanks">Thank you!</div>
                            <button onClick={this.onClickSendFeedback} type="submit" name="submit">Send Feedback</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    },
});

const Form = React.createClass({
    render: function() {
        let form;
        switch (this.state.form) {
            case 'phone':
            form = <PhoneForm changeForm={ this.changeForm } />;
            break;

            case 'script':
            form = <PhoneScript />;
            break;

            case 'demophone':
            form = <DemoPhoneForm changeForm={ this.changeForm } />;
            break;

            case 'demoscript':
            form = <DemoPhoneScript />;
            break;

            case 'thanks':
            form = <Thanks />;
            break;

            case 'opt-out':
            form = <OptOutForm />;
            break;
        }

        return (
            <div className="form">
                { form }
            </div>
        );
    },

    getInitialState: function () {
        let form = 'phone';

        if (state.query.call_tool) {
            form = 'phone';
        }

        if (getSource() === 'mpower') {
            form = 'phone';
        }

        if (state.query.phase) {
            form = state.query.phase;
        }

        if (state.query.debugState) {
            form = state.query.debugState;
        }

        if ('embeddedConfiguration' in window) {
            form = embeddedConfiguration.phase || 'phone';
        }

        return {
            form: form,
        };
    },

    changeForm: function(form) {
        this.setState({
            form: form,
        });

        const pos = findPos(this);
        scrollTo(0, pos - 16);
    },
});

const Organizations = () => (
    <div className="organizations">
        <div className="clamp">
            <h4>Site created by</h4>
            <div className="larger">
                <a title="Demand Progress" href="https://demandprogress.org" target="_blank"><img src="images/logos/demandprogress-logo-new-stacked.png" /></a>
            </div>
        </div>
    </div>
);

const Contact = React.createClass({
    render: function() {
        return (
            <div className="contact">
                For press inquiries, please contact us at:
                <br />
                <a href="mailto:press@rootstrikers.org">press@rootstrikers.org</a>
            </div>
        );
    },
});

const Social = React.createClass({
    render: function() {
        return (
            <div className="midnight-share-train">
                <div className="share">
                    <a onClick={this.onClickTwitter} target="_blank" href="#Share on Twitter" className="twitter">Tweet</a>
                    <a onClick={this.onClickFacebook} target="_blank" href="#Share on Facebook" className="facebook">Share</a>
                    <a href={emailHref} className="email">Email</a>
                </div>
            </div>
        );
    },

    onClickTwitter: function(e) {
        e.preventDefault();

        let shareText = document.querySelector('[name="twitter:description"]').content;

        // const source = getSource();
        //
        // if (source) {
        //     shareText += '/?source=' + source;
        // }

        const url = urls.twitter +
                  encodeURIComponent(shareText) +
                  '&ref=demandprogress';

        window.open(url);
    },

    onClickFacebook: function(e) {
        e.preventDefault();

        var shareUrl = config.link;

        if ('embeddedConfiguration' in window) {
            if (embeddedConfiguration.link) {
                shareUrl = embeddedConfiguration.link;
            }
        }

        let url = urls.facebook + encodeURIComponent(shareUrl + '?source=fb-share');

        // const source = getSource();
        //
        // if (source) {
        //     url += '%3Fsource%3D' + source;
        // }

        window.open(url);
    },
});

const CallPages = React.createClass({
    render: function() {
        return (
            <div className="wrapper">
                <Header />

                <Form />

                <Social />

                <Organizations />

                <Contact />
            </div>
        );
    },

    imagesToPreload: [
        'images/phone.svg',
    ],

    componentDidMount: function() {
        for (let i = 0; i < this.imagesToPreload.length; i++) {
            const image = new Image();
            image.src = this.imagesToPreload[i];
        }
    },
});

function render() {
    ReactDOM.render(
        <CallPages />,
        document.querySelector('#app')
    );
}

render();