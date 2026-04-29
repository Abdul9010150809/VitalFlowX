"""initial schema

Revision ID: 0001_initial
Revises: 
Create Date: 2026-04-29 00:00:00.000000
"""

from alembic import op
import sqlalchemy as sa


revision = "0001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "actors",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("role", sa.String(), nullable=False),
        sa.Column("email", sa.String(), nullable=False, unique=True),
        sa.Column("hashed_password", sa.String(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_table(
        "shipments",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("product_details", sa.JSON(), nullable=False),
        sa.Column("origin", sa.String(), nullable=False),
        sa.Column("destination", sa.String(), nullable=False),
        sa.Column("route_plan", sa.JSON(), nullable=True),
        sa.Column("temp_rules", sa.JSON(), nullable=True),
        sa.Column("blockchain_hash", sa.String(), nullable=True),
        sa.Column("tx_hash", sa.String(), nullable=True),
        sa.Column("status", sa.String(), nullable=False),
        sa.Column("created_by_id", sa.Integer(), sa.ForeignKey("actors.id"), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_table(
        "events",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("shipment_id", sa.Integer(), sa.ForeignKey("shipments.id"), nullable=False),
        sa.Column("event_type", sa.String(), nullable=False),
        sa.Column("geo", sa.JSON(), nullable=True),
        sa.Column("actor_id", sa.Integer(), sa.ForeignKey("actors.id"), nullable=True),
        sa.Column("timestamp", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("proof_hash", sa.String(), nullable=True),
    )
    op.create_table(
        "sensor_logs",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("shipment_id", sa.Integer(), sa.ForeignKey("shipments.id"), nullable=False),
        sa.Column("temperature", sa.Float(), nullable=True),
        sa.Column("humidity", sa.Float(), nullable=True),
        sa.Column("lat", sa.Float(), nullable=True),
        sa.Column("lng", sa.Float(), nullable=True),
        sa.Column("recorded_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_table(
        "documents",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("shipment_id", sa.Integer(), sa.ForeignKey("shipments.id"), nullable=False),
        sa.Column("filename", sa.String(), nullable=False),
        sa.Column("sha256", sa.String(), nullable=False),
        sa.Column("ipfs_hash", sa.String(), nullable=True),
        sa.Column("tx_hash", sa.String(), nullable=True),
        sa.Column("uploaded_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_table(
        "alerts",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("shipment_id", sa.Integer(), sa.ForeignKey("shipments.id"), nullable=True),
        sa.Column("alert_type", sa.String(), nullable=False),
        sa.Column("message", sa.String(), nullable=False),
        sa.Column("resolved", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_table(
        "exception_cases",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("shipment_id", sa.Integer(), sa.ForeignKey("shipments.id"), nullable=False),
        sa.Column("description", sa.String(), nullable=False),
        sa.Column("status", sa.String(), nullable=False, server_default=sa.text("'open'")),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )


def downgrade() -> None:
    op.drop_table("exception_cases")
    op.drop_table("alerts")
    op.drop_table("documents")
    op.drop_table("sensor_logs")
    op.drop_table("events")
    op.drop_table("shipments")
    op.drop_table("actors")
