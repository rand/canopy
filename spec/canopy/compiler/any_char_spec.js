Canopy.Compiler.AnyCharSpec = JS.Test.describe(Canopy.Compiler.AnyChar, function() { with(this) {
  include(Canopy.SpecHelper)
  
  before(function() { with(this) {
    Canopy.compile('grammar AnyCharTest\
      anyChar <- .')
  }})
  
  it('parses a single character', function() { with(this) {
    assertParse( ['x', 0, []], AnyCharTestParser.parse('x') )
  }})
  
  it('does not parse the empty string', function() { with(this) {
    assertNull( AnyCharTestParser.parse('') )
    assertEqual({
        input:    '',
        offset:   0,
        expected: '<any char>',
        actual:   '<EOF>'
      }, AnyCharTestParser.lastError)
  }})
}})

