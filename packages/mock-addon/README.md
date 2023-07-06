<div align="center">
        <img src="https://raw.githubusercontent.com/nutboltu/storybook-addon-mock/master/assets/logo.svg" alt="Storybook addon mock" height="150" />
        <h1>Storybook Addon Mock</h1>
</div>

<p>
    <a href="https://github.com/nutboltu/storybook-addon-mock/actions">
        <img src="https://github.com/nutboltu/storybook-addon-mock/workflows/CI/badge.svg" alt="Actions Status" />
    </a>
    <a href="#">
        <img src="https://img.shields.io/npm/dm/storybook-addon-mock.svg" alt="Npm download" />
    </a>
    <a href="https://badge.fury.io/js/storybook-addon-mock">
        <img src="https://badge.fury.io/js/storybook-addon-mock.svg" alt="npm version" />
    </a>
     <a href="https://github.com/nutboltu/storybook-addon-mock/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/nutboltu/storybook-addon-mock" alt="License" />
    </a>
</p>

[![NPM](https://nodei.co/npm/storybook-addon-mock.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/storybook-addon-mock/)


This addon allows you to mock fetch or XMLHttprequest requests in [storybook](https://storybook.js.org/).
If your component depends on backend requests, and your backend requests are not ready yet to feed your component,
this addon provides mock response to build your component.


### Purpose

There are few packages those help the developers to mock the backend requests while building components.
But those packages aren't integrated properly in storybook and also there's no scope to play with those requests in the storybook.
Mostly, there's no playground to modify the response and see the changes in the storybook.

### Highlights

`storybook-addon-mock` provides the following features.
 
 <ul>
    <li> You can mock <strong>fetch or XMLHttpRequest</strong>.</li>
    <li> A <strong>dedicated panel</strong> where you can see the list of mock requests.</li>
    <li> An <strong>on/off button for each request</strong> which can turn off the mock and try the real request.</li>
    <li> A <strong>dropdown list of status code</strong> where you can change the status and experience the difference.</li>
    <li> A <strong>response JSON object which can be modified in the panel.</strong> You can see the changes straight away in the story.</li>
    <li> A <strong>delay option which helps you delaying the response</strong> so that you can test any kind of loading behaviour.</li>
 </ul>

### Documentation

[See the documentation](https://storybook-addon-mock.netlify.app)

[Older(2.*) version documentation](https://github.com/nutboltu/storybook-addon-mock/blob/2.4.1/README.md)
### License

This project is licensed under the MIT License - see the LICENSE file in the source code for details.
