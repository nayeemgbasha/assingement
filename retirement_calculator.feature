Feature: Retirement Calculator

  Scenario: Calculate retirement details
    Given I navigate to the retirement calculator website
    When I enter the retirement details
    And I click on calculate
    Then I verify minimum retirement and savings
