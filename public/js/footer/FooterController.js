'use strict';

annaSquaresApp.controller('footerController',
  function FooterController($scope) {

    $scope.copyrightNotice = '© 2013 Adam Joseph Cook';

    $scope.links = [
      {
        title : 'Terms',
        url   : ''
      },
      {
        title : 'Privacy',
        url   : ''
      },
      {
        title : 'Contact',
        url   : ''
      },
      {
        title : 'About',
        url   : ''
      },
    ];

  }
);