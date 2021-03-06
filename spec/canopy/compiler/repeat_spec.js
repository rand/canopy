Canopy.Compiler.RepeatSpec = JS.Test.describe(Canopy.Compiler.Repeat, function() { with(this) {
  include(Canopy.SpecHelper)
  
  describe('maybe', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar MaybeTest\
        maybe <- "jc"?')
    }})
    
    it('parses if its pattern is present', function() { with(this) {
      assertParse( ['jc', 0, []], MaybeTestParser.parse('jc') )
    }})
    
    it('parses if no input is given', function() { with(this) {
      assertParse( ['', 0, []], MaybeTestParser.parse('') )
    }})
    
    it('does not parse if different input is given', function() { with(this) {
      assertNull( MaybeTestParser.parse('gc') )
    }})
  }})
  
  describe('with zero minimum occurences', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar ZeroOrMoreTest\
        root <- "foo"*')
    }})
    
    it('matches zero occurences of the pattern', function() { with(this) {
      assertParse( ['', 0, []], ZeroOrMoreTestParser.parse('') )
    }})
    
    it('matches one occurence of the pattern', function() { with(this) {
      assertParse(['foo', 0, [
                    ['foo', 0, []]]],
        
        ZeroOrMoreTestParser.parse('foo') )
    }})
    
    it('matches more than one occurence of the pattern', function() { with(this) {
      assertParse(['foofoofoo', 0, [
                    ['foo', 0, []],
                    ['foo', 3, []],
                    ['foo', 6, []]]],
        
        ZeroOrMoreTestParser.parse('foofoofoo') )
    }})
    
    it('does not match superstrings of the repeated pattern', function() { with(this) {
      assertNull( ZeroOrMoreTestParser.parse('foofood') )
    }})
    
    describe('followed by more of the repeated pattern', function() { with(this) {
      before(function() { with(this) {
        Canopy.compile('grammar ZeroOrUnparsable\
          root <- "foo"* "foo"')
      }})
      
      it('does not parse any number of occurences', function() { with(this) {
        assertNull( ZeroOrUnparsableParser.parse('') )
        assertNull( ZeroOrUnparsableParser.parse('foo') )
        assertNull( ZeroOrUnparsableParser.parse('foofoo') )
      }})
    }})
  }})
  
  describe('with one minimum occurence', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar OneOrMoreTest\
        root <- "foo"+')
    }})
    
    it('does not match zero occurences of the pattern', function() { with(this) {
      assertNull( OneOrMoreTestParser.parse('') )
    }})
    
    it('matches one occurence of the pattern', function() { with(this) {
      assertParse(['foo', 0, [
                    ['foo', 0, []]]],
        
        OneOrMoreTestParser.parse('foo') )
    }})
    
    it('matches more than one occurence of the pattern', function() { with(this) {
      assertParse(['foofoofoo', 0, [
                    ['foo', 0, []],
                    ['foo', 3, []],
                    ['foo', 6, []]]],
        
        OneOrMoreTestParser.parse('foofoofoo') )
    }})
    
    it('does not match superstrings of the repeated pattern', function() { with(this) {
      assertNull( OneOrMoreTestParser.parse('foofood') )
    }})
    
    describe('followed by more of the repeated pattern', function() { with(this) {
      before(function() { with(this) {
        Canopy.compile('grammar OneOrUnparsable\
          root <- "foo"+ "foo"')
      }})
      
      it('does not parse any number of occurences', function() { with(this) {
        assertNull( OneOrUnparsableParser.parse('') )
        assertNull( OneOrUnparsableParser.parse('foo') )
        assertNull( OneOrUnparsableParser.parse('foofoo') )
      }})
    }})
  }})
}})

