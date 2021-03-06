var Optional = function(value) {
  this.value = value;
}

var EMPTY_OPTIONAL = new Optional(null);

Optional.prototype.map = function(mappingFunction) {
  if(this.isEmpty()) {
      return this;
  }

  return new Optional(mappingFunction(this.value));
}

Optional.prototype.flatMap = function(mappingFunction) {
  if(this.isEmpty()) {
      return this;
  }

  return mappingFunction(this.value);
}

Optional.prototype.orElseGet = function(elementSupplierFunction) {
    if(this.isEmpty()) {
        return elementSupplierFunction();
    } else {
        return this.value;
    }
}

Optional.prototype.filter = function(filteringPredicate) {
  if(this.isEmpty()) {
      return this;
  }

  return filteringPredicate(this.value) ? this : Optional.empty();
}

Optional.prototype.ifPresent = function(consumesValueIfPresentFunction) {
  if(this.isPresent()) {
      consumesValueIfPresentFunction(this.value);
  }

  return this;
}

Optional.prototype.orElse = function(executesIfValueIsNotPresentFunction) {
  if(this.isEmpty()) {
      executesIfValueIsNotPresentFunction();
  }
}

Optional.empty = function() {
  return EMPTY_OPTIONAL;
}

Optional.of = function(value) {
  return new Optional(value);
}

Optional.ofThrowable = function(functionWhichThrows) {
    try { functionWhichThrows(); }
    catch(err) { return new Optional(err); }
    return Optional.empty();
}

Optional.prototype.isPresent = function() {
  return !this.isEmpty();
}

Optional.prototype.isEmpty = function() {
  return this.value == null;
}
