#Name: Ujjwal Dixit
#NSID: ujd564
#STUDENT NUMBER: 11290808
#Class: CMPT215


# Here I have defined some functions calls

.equ SYS_exit, 93
.equ SYS_readInt, 245
.equ SYS_printInt, 244
.equ SYS_readStr, 249
.equ SYS_printStr, 248
.equ SYS_readChar, 247
.equ SYS_printChar, 246
.equ SYS_readFloat, 251
.equ SYS_printFloat, 250


## Comments: fmv.x.s will move from register in f-register to normal register
## Comments: fcvt.s.w or fcvt.s.wu will convert integer and unsigned integer to float
## Comments: fmv.s is like mv but for f-register
## Comments: fdiv.s and fadd.s will divide and add respectively

.section .rodata
    prompt_x: .string "Enter x:"
    prompt_n: .string "Enter n:"
    response_a: .string "part_a:"
    response_b: .string "part B:"

.section .text

# Precondition: fa2 = 1, a1 is correct
# Postcondition: value is output in fa2, make sure to store it before moving ahead
## factorial ## =====>>> factorial(a1) : return -> fa2    ## save a1, fa1, fa2, t1, t2
    factorial_base:
        ret

    factorial:
        li t2, 2
        blt a1, t2, factorial_base # loop_untill (a1 < 2)

        li t1, 1

        fcvt.s.wu fa1, a1

        fmul.s fa2, fa2, fa1
        sub a1, a1, t1


        j factorial

## end factorial ##

# Precondition: fa2 = 1, a1 is correct, fa0 should never change
# Postcondition: value is output in fa1, make sure to store it before moving ahead
## power ## =====>>> power(fa0, a1) : return -> fa1    ## save a1, fa1, fa2, t1, t2
    power_base:
        fmv.s fa1, fa2
        ret

    power:
        beqz a1, power_base # loop_untill (a1 = 0)

        li t1, 1

        fmul.s fa2, fa2, fa0
        sub a1, a1, t1


        j power

## end factorial ##

## calculate the value at the i-th place
    calculate_i:
        li t1, 1
        li t2, 2

        # statisfying the pre-condtion for power
        fcvt.s.wu fa2, t1

        # power
        addi sp, sp, -8
        sw ra, 8(sp)
        sw a1, 4(sp)
        # mul a1, a1, t2
        sll a1, a1, t1
        sub a1, a1, t2
        jal ra, power
        lw a1, 4(sp)
        lw ra, 8(sp)
        addi sp, sp, 8

        # statisfying the post-condtion for power
        fmv.s fa4, fa1

        # statisfying the pre-condtion for factorial
        fcvt.s.wu fa2, t1

        # factorial
        addi sp, sp, -8
        sw ra, 8(sp)
        sw a1, 4(sp)
        # mul a1, a1, t2
        sll a1, a1, t1
        sub a1, a1, t2
        jal ra, factorial
        lw a1, 4(sp)
        lw ra, 8(sp)
        addi sp, sp, 8

        # No need to handle post-condition for factorial

        # calculate i-th value
        fmv.s fa1, fa4
        fdiv.s fa4, fa1, fa2


        ret
## end calculate_i ##

## cos_maclaurin_parta ##

    cos_maclaurin_parta_even:
        addi sp, sp, -4
        sw ra, 4(sp)
        jal ra, calculate_i
        lw ra, 4(sp)
        addi sp, sp, 4

        fsub.s fa3, fa3, fa4
        sub a1, a1, t1 # a1 = a1 - 1 after every time we calculate i-th value
        j cos_maclaurin_parta_begin

    cos_maclaurin_parta_odd:
        addi sp, sp, -4
        sw ra, 4(sp)
        jal ra, calculate_i
        lw ra, 4(sp)
        addi sp, sp, 4

        fadd.s fa3, fa3, fa4
        sub a1, a1, t1 # a1 = a1 - 1 after every time we calculate i-th value
        j cos_maclaurin_parta_begin

    cos_maclaurin_parta_base:
        fmv.x.w a0, fa3
        ret

    cos_maclaurin_parta:
        li t1, 1
        li t2, 2
        fmv.w.x fa0, a0
        fcvt.s.wu fa2, t1
        fcvt.s.wu fa3, t1

        j cos_maclaurin_parta_begin

    cos_maclaurin_parta_begin:
        blt a1, t2, cos_maclaurin_parta_base

        # rem t3, a1, t2
        and t3, a1, t1
        beqz t3, cos_maclaurin_parta_even
        bnez t3, cos_maclaurin_parta_odd



# ## end cos_maclaurin_parta ##


## cos_maclaurin_partb ##
    cos_maclaurin_partb_even_sum: # starts from the 3rd value
        mv a2, a1
        addi a2, a2, 2
        li a1, 2
        j cos_maclaurin_partb_even

    cos_maclaurin_partb_even: # starts from the 2nd value

        addi sp, sp, -4
        sw ra, 4(sp)
        jal ra, calculate_i
        lw ra, 4(sp)
        addi sp, sp, 4

        fadd.s fa3, fa3, fa4

        addi a1, a1, 2
        blt a1, a2, cos_maclaurin_partb_even

        ret

    cos_maclaurin_partb_odd_sum: # starts from the 3rd value
        mv a2, a1
        addi a2, a2, 2
        li a1, 3
        j cos_maclaurin_partb_odd

    cos_maclaurin_partb_odd:
        addi sp, sp, -4
        sw ra, 4(sp)
        jal ra, calculate_i
        lw ra, 4(sp)
        addi sp, sp, 4

        fadd.s fa3, fa3, fa4

        addi a1, a1, 2
        blt a1, a2, cos_maclaurin_partb_odd

        ret



    cos_maclaurin_partb_base:
        fmv.x.w a0, fa3
        ret

    cos_maclaurin_partb:
        li t1, 1
        li t2, 2
        fmv.w.x fa0, a0
        fcvt.s.wu fa2, t1
        fcvt.s.wu fa3, t1

        blt a1, t2, cos_maclaurin_partb_base

        addi sp, sp, -8
        sw ra, 8(sp)
        sw a1, 4(sp)
        sub a1, a1, t1
        jal ra, cos_maclaurin_partb_odd_sum
        lw a1, 4(sp)
        lw ra, 8(sp)
        addi sp, sp, 8

        fmv.s fa5, fa3
        fcvt.s.wu fa3, zero

        addi sp, sp, -8
        sw ra, 8(sp)
        sw a1, 4(sp)
        jal ra, cos_maclaurin_partb_even_sum
        lw a1, 4(sp)
        lw ra, 8(sp)
        addi sp, sp, 8

        fsub.s fa3, fa5, fa3

        j cos_maclaurin_partb_base



## end cos_maclaurin_partb ##
.global _start
_start:

    ## Read INT ###
        li a7, SYS_readFloat  # a0 = x
        ecall
        mv t0, a0

        li a7, SYS_readInt  # a1 = n
        ecall

        mv a1, a0
        mv a0, t0

    ## END Read INT ###

    ## Call function a ###
        # save arguments (a0 = x, a1 = n)
            mv s1, a0
            mv s2, a1
        # function call
            jal ra, cos_maclaurin_parta
            mv s0, a0

        ## Print response ##
            mv a0, s0
            li a1, 0
            li a2, 9
            li a7, SYS_printFloat
            ecall

            li a0, ','
            li a7, SYS_printChar
            ecall

            li a0, ' '
            li a7, SYS_printChar
            ecall
        ## End Response ###

    ### End function call ###

     ## Call function b ###
        # retrive arguments (a0 = x, a1 = n)
            mv a0, s1
            mv a1, s2

        # function call
            jal ra, cos_maclaurin_partb
            mv s0, a0

        ## Print response ##
            mv a0, s0
            li a1, 0
            li a2, 9
            li a7, SYS_printFloat
            ecall
        ## End Response ###

    ### End function call ###

    ## Exit ###
        li a0, '\n'
        li a7, SYS_printChar
        ecall

        li a0, 0
        li a7, SYS_exit
        ecall