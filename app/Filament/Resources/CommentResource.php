<?php

namespace App\Filament\Resources;

use App\Enums\NavigationGroup;
use App\Filament\Resources\CommentResource\Pages;
use App\Models\Comment;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Filament\Actions;

class CommentResource extends Resource
{
    protected static ?string $model = Comment::class;
    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-chat-bubble-left-ellipsis';
    protected static \UnitEnum|string|null $navigationGroup = NavigationGroup::Moderation;
    protected static ?string $modelLabel = 'Comentario';
    protected static ?string $pluralModelLabel = 'Comentarios';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Textarea::make('body')->label('Contenido')->required()->columnSpanFull(),
            Toggle::make('is_flagged')->label('Marcado para revisión'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('user.name')->label('Usuario')->searchable()->sortable(),
                TextColumn::make('course.title')->label('Curso')->searchable()->limit(30),
                TextColumn::make('body')->label('Comentario')->limit(60)->wrap(),
                IconColumn::make('is_flagged')->label('Reportado')->boolean()
                    ->trueColor('danger')->falseColor('gray'),
                TextColumn::make('created_at')->label('Fecha')->dateTime('d/m/Y H:i')->sortable(),
            ])
            ->filters([
                TernaryFilter::make('is_flagged')
                    ->label('Reportados')
                    ->trueLabel('Solo reportados')
                    ->falseLabel('Sin reporte')
                    ->placeholder('Todos'),
            ])
            ->actions([
                Actions\EditAction::make(),
                Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Actions\BulkActionGroup::make([
                    Actions\BulkAction::make('unflag')
                        ->label('Marcar como revisado')
                        ->icon('heroicon-o-check')
                        ->action(fn ($records) => $records->each->update(['is_flagged' => false]))
                        ->deselectRecordsAfterCompletion(),
                    Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListComments::route('/'),
            'edit' => Pages\EditComment::route('/{record}/edit'),
        ];
    }
}
