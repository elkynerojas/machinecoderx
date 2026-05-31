<?php

namespace App\Filament\Resources;

use App\Enums\NavigationGroup;
use App\Filament\Resources\CouponResource\Pages;
use App\Filament\Resources\CouponResource\RelationManagers\RedemptionsRelationManager;
use App\Models\Coupon;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Actions;

class CouponResource extends Resource
{
    protected static ?string $model = Coupon::class;
    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-ticket';
    protected static \UnitEnum|string|null $navigationGroup = NavigationGroup::Finance;
    protected static ?string $modelLabel = 'Cupón';
    protected static ?string $pluralModelLabel = 'Cupones';
    protected static ?string $recordTitleAttribute = 'code';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('code')->label('Código')->required()->unique(ignoreRecord: true)
                ->dehydrateStateUsing(fn ($state) => strtoupper($state)),
            TextInput::make('access_days')->label('Días de acceso')->integer()->required()->minValue(1),
            TextInput::make('max_uses')->label('Usos máximos')->integer()->nullable()->placeholder('Ilimitado'),
            DateTimePicker::make('expires_at')->label('Expira el')->nullable(),
            Toggle::make('is_active')->label('Activo')->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('code')->label('Código')->searchable()->sortable()->copyable(),
                TextColumn::make('access_days')->label('Días de acceso')->sortable(),
                TextColumn::make('max_uses')->label('Usos máx.')->placeholder('Ilimitado'),
                TextColumn::make('redemptions_count')->label('Canjeados')->counts('redemptions')->sortable(),
                TextColumn::make('expires_at')->label('Expira')->dateTime('d/m/Y H:i')->placeholder('Sin vencimiento'),
                IconColumn::make('is_active')->label('Activo')->boolean(),
            ])
            ->actions([
                Actions\EditAction::make(),
                Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Actions\BulkActionGroup::make([
                    Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            RedemptionsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCoupons::route('/'),
            'create' => Pages\CreateCoupon::route('/create'),
            'edit' => Pages\EditCoupon::route('/{record}/edit'),
        ];
    }
}
