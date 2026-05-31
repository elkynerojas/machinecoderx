<?php

namespace App\Filament\Resources\CouponResource\RelationManagers;

use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Actions;

class RedemptionsRelationManager extends RelationManager
{
    protected static string $relationship = 'redemptions';
    protected static ?string $title = 'Canjes';

    public function form(Schema $schema): Schema
    {
        return $schema->components([]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')->label('Usuario')->searchable(),
                TextColumn::make('redeemed_at')->label('Canjeado el')->dateTime('d/m/Y H:i')->sortable(),
                TextColumn::make('access_until')->label('Acceso hasta')->dateTime('d/m/Y H:i')->sortable(),
            ]);
    }
}
