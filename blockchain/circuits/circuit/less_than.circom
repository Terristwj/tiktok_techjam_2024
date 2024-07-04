pragma circom 2.0.0;

template LessThan(n) {
    signal input a;
    signal input b;
    signal output result;

    if a < b:
        result <= 1
    result <== (a < b) ? 1 : 0;
}
    
component main = LessThan(256);
