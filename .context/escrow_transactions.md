CREATE TABLE escrow_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    booking_payment_id UUID NOT NULL UNIQUE,
    booking_id UUID NOT NULL,
    tenant_id UUID NOT NULL,
    owner_id UUID NOT NULL,

    currency currency_enum NOT NULL,

    amount_held NUMERIC(12,2) NOT NULL,
    amount_released NUMERIC(12,2) NOT NULL DEFAULT 0,
    amount_refunded NUMERIC(12,2) NOT NULL DEFAULT 0,
    amount_remaining NUMERIC(12,2) NOT NULL,

    status escrow_status_enum NOT NULL DEFAULT 'held',

    release_reason escrow_release_reason_enum,

    held_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    release_available_at TIMESTAMPTZ NOT NULL,
    released_at TIMESTAMPTZ,
    frozen_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT escrow_booking_payment_fk
        FOREIGN KEY (booking_payment_id)
        REFERENCES booking_payments(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT escrow_booking_fk
        FOREIGN KEY (booking_id)
        REFERENCES bookings(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT escrow_tenant_fk
        FOREIGN KEY (tenant_id)
        REFERENCES users(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT escrow_owner_fk
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT escrow_amounts_non_negative
        CHECK (
            amount_held >= 0
            AND amount_released >= 0
            AND amount_refunded >= 0
            AND amount_remaining >= 0
        ),

    CONSTRAINT escrow_no_over_distribution
        CHECK (
            amount_released + amount_refunded <= amount_held
        ),

    CONSTRAINT escrow_tenant_owner_different
        CHECK (
            tenant_id <> owner_id
        )
);