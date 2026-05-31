<?php

namespace App\Filament\Resources;

use App\Enums\NavigationGroup;
use App\Filament\Resources\RatingResource\Pages;
use App\Models\Rating;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Filament\Actions;

class RatingResource extends Resource
{
    protected static ?string $model = Rating::class;
    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-star';
    protected static \UnitEnum|string|null $navigationGroup = NavigationGroup::Moderation;
    protected static ?string $modelLabel = 'Valoración';
    protected static ?string $pluralModelLabel = 'Valoraciones';

    public static function infolist(Schema $schema): Schema
    {
        return $schema->components([
            TextEntry::make('user.name')->label('Usuario'),
            TextEntry::make('course.title')->label('Curso'),
            TextEntry::make('value')->label('Puntuación')->suffix(' / 5'),
            TextEntry::make('created_at')->label('Fecha')->dateTime('d/m/Y H:i'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('user.name')->label('Usuario')->searchable()->sortable(),
                TextColumn::make('course.title')->label('Curso')->searchable()->limit(30),
                TextColumn::make('value')->label('Puntuación')
                    ->badge()
                    ->color(fn (int $state) => match (true) {
                        $state <= 2 => 'danger',
                        $state === 3 => 'warning',
                        default => 'success',
                    })
                    ->suffix(' ★'),
                TextColumn::make('created_at')->label('Fecha')->dateTime('d/m/Y')->sortable(),
            ])
            ->filters([
                SelectFilter::make('value')->label('Puntuación')
                    ->options([1 => '1 ★', 2 => '2 ★', 3 => '3 ★', 4 => '4 ★', 5 => '5 ★']),
            ])
            ->actions([
                Actions\ViewAction::make(),
                Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Actions\BulkActionGroup::make([
                    Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListRatings::route('/'),
            'view' => Pages\ViewRating::route('/{record}'),
        ];
    }
}
