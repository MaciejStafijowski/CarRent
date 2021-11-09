Feature: Search car for rent

  As a Customer I want to search for a car for rent

  Scenario: Valid search for specific country and city
    Given user is on search page
    When he fills the search data
    And he use search
    Then search results appears

  Scenario: Search without filling form
    Given user is on search page
    When he use search
    Then no search results are displayed

  Scenario: User is able to see car details
    Given user has searched for a car
    When choose car for rent
    Then see car details

#    The part of test cases below is not automated

  Scenario: User is able to provide personal data in the rent form
    Given user as chosen a car
    When he provides personal data
    Then user rents car

  Scenario Outline: User is not able to search for city from different country
    Given user is on search page
    When he search for <city> in <country>
    Then then search thows error

    Examples:
      |city |country |
      |Berlin |France |
      |Paris  |Poland |
      |Wroclaw |Germany |
