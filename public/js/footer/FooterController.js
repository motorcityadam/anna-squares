'use strict';

annaSquaresApp.controller('footerController',
  function FooterController($scope) {

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