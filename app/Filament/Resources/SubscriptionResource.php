<?php

namespace App\Filament\Resources;

use App\Enums\NavigationGroup;
use App\Enums\SubscriptionPeriod;
use App\Enums\SubscriptionStatus;
use App\Filament\Resources\SubscriptionResource\Pages;
use App\Models\Subscription;
use Filament\Forms\Components\Select;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Filament\Actions;

class SubscriptionResource extends Resource
{
    protected static ?string $model = Subscription::class;
    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-credit-card';
    protected static \UnitEnum|string|null $navigationGroup = NavigationGroup::Finance;
    protected static ?string $modelLabel = 'Suscripción';
    protected static ?string $pluralModelLabel = 'Suscripciones';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Select::make('status')->label('Estado')->options(SubscriptionStatus::class)->required(),
        ]);
    }

    public static function infolist(Schema $schema): Schema
    {
        return $schema->components([
            TextEntry::make('user.name')->label('Usuario'),
            TextEntry::make('period')->label('Período')->badge(),
            TextEntry::make('status')->label('Estado')->badge(),
            TextEntry::make('current_period_start')->label('Inicio del período')->dateTime('d/m/Y'),
            TextEntry::make('current_period_end')->label('Fin del período')->dateTime('d/m/Y'),
            TextEntry::make('canceled_at')->label('Cancelada el')->dateTime('d/m/Y')->placeholder('—'),
            TextEntry::make('stripe_subscription_id')->label('ID Stripe'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('user.name')->label('Usuario')->searchable()->sortable(),
                TextColumn::make('period')->label('Período')->badge()->sortable(),
                TextColumn::make('status')->label('Estado')->badge()->sortable(),
                TextColumn::make('current_period_end')->label('Vence')->dateTime('d/m/Y')->sortable(),
                TextColumn::make('created_at')->label('Creada')->dateTime('d/m/Y')->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')->label('Estado')->options(SubscriptionStatus::class),
                SelectFilter::make('period')->label('Período')->options(SubscriptionPeriod::class),
            ])
            ->actions([
                Actions\ViewAction::make(),
                Actions\EditAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSubscriptions::route('/'),
            'view' => Pages\ViewSubscription::route('/{record}'),
            'edit' => Pages\EditSubscription::route('/{record}/edit'),
        ];
    }
}
